---
title: "Building a Real-Time Geospatial Supply and Demand Tracker with Redis ZSET"
description: "My first blog post"
date: "2025-11-16"
---

## Goal

Build a high-performance read/write system capable of monitoring count-based metrics across thousands of geospatial locations.

Answer the question: for a given location, how many units of each type are currently present?

## Introduction

Real-time geospatial systems are difficult to build because they demand low-latency reads, high-throughput writes, and a consistent way to maintain state. In my case, I needed to track different types of countable units specifically supply and demand across thousands of locations with continuous updates occurring every second.

Redis, and in particular Redis Sorted Sets (ZSET), became the core foundation of the solution. In this blog, I will walk through how I implemented a real-time geospatial tracking system in Go using Redis ZSET, why the data model fits this use case, and some of the key lessons learned throughout the process.

My goal is to provide a practical guide for engineers who may be implementing something similar.

---

**Real-time**

- A system that processes and updates information with minimal delay relative to when events occur.
- The threshold for what qualifies as “real-time” varies by use case. I will describe the specific performance requirements of this implementation in later sections.

**Countable Units (Supply and Demand)**

- A unit representing any entity contributing to a metric. In ride-hailing scenarios, this might be available drivers (supply) and customer requests (demand).

---

## Tools Used

### Location Indexing

To aggregate real-time events by geographic area, I first needed a method to map coordinates to a consistent, indexable "location." I chose Uber's H3 system. [TODO: link to docs]
- H3 is a global grid system that partitions the Earth into hexagonal cells.
- It provides a lightweight interface for converting latitude and longitude into an H3 index.
- Cell size can be tuned by selecting different H3 resolutions, allowing the system to operate at varying levels of geographic precision.

![h3 diagram](/writing/sdr-tracker/h3-diagram.png)

### Database Layer

As described in the introduction, Redis served as the primary data store, with Redis Sorted Sets (ZSET) used to maintain the counts for each location.

- Redis is an in-memory key-value store optimized for high-throughput, low-latency operations, making it well-suited for real-time workloads.
- In the context of this system, we needed a shared data store that can be accessed by a distributed system. 
- A ZSET stores unique members ordered by a numeric score. [TODO: link to docs]
- This ordering enables efficient increments, decrements, range queries, and filtered lookups.

---

## The Setup and Assumptions

- The system is event-driven. A Go application consumes events from a message broker such as Kafka or RabbitMQ.
- Each event represents a change in the state of a unit. The event model resembles the following:

|Attribute|Type|Description|
|---|---|---|
|id|uuid|Unique identifier of the unit|
|type|string|Logical category of the unit (e.g., vehicle, request, delivery-agent, etc.)|
|longitude|float|Geographic coordinate|
|latitude|float|Geographic coordinate|
|action|string|Indicates whether the event adds or removes a unit (e.g., increase, decrease)|

**Sample event:**

```json
{
  "id": "0000000",
  "type": "supply",
  "longitude": "14.55855399312343",
  "latitude": "121.02289384835474",
  "action": "increase"
}
```

- In some implementations, an event may omit latitude and longitude entirely and instead reference a location identifier directly. For this blog, I will include coordinates to demonstrate how geographic grouping is performed.

---

## Data Flow Walkthrough

### When an event arrives:

![Data Flow](/writing/sdr-tracker/data-flow1.png)

1. **An event arrives at the application**
   The system receives an incoming event representing a state change for a unit (for example, a unit becoming active or inactive). This event is the trigger for all subsequent processing.

2. **The application computes the location index**
   Upon receiving the event, the application derives a *location index* from the event payload. This index represents how the unit is spatially grouped (for example, a geospatial cell, region identifier, or logical partition).
   This step is purely computational and does not involve storage.

3. **The location is recorded in Redis**
   The computed location index is written to a Redis Set that tracks all known locations.
   This allows the system to efficiently enumerate or validate active locations without scanning the entire dataset.

4. **A database index is generated**
   Using the location index and unit identifier, the application constructs a deterministic database key (or index).
   This index uniquely identifies the unit within its location and ensures consistent reads and writes across operations.

5. **The application determines whether to increment or decrement the count**
   Based on the event type, the application evaluates whether the unit should be *added* or *removed* from the active count.
   This decision point abstracts the business semantics of the event and keeps storage operations simple and uniform.

6. **If the count should be incremented, the unit is added to the corresponding ZSET**
   When the decision is to increment, the application adds the generated database index to the appropriate Redis Sorted Set (ZSET).
   The ZSET acts as the source of truth for active units within a given location, enabling fast cardinality queries and range-based operations.

7. **If the count should be decremented, the unit is removed from the corresponding ZSET**
   When the decision is to decrement, the application removes the database index from the same Redis ZSET.
   This ensures that the count remains accurate and reflects only currently active units.

8. **Redis becomes the authoritative store for counts**
   By using Redis Sets and Sorted Sets, the system avoids maintaining explicit counters.
   Counts are derived from set cardinality, ensuring correctness even in the presence of retries or duplicate events.

### In the background:

<!-- <img 
  src="/writing/sdr-tracker/data-flow1.png" 
  alt="Data flow diagram" 
  style="width: 80%; display: block; margin: 0 auto;" 
/> -->

![Data Flow](/writing/sdr-tracker/data-flow2.png)

1. **A cleanup interval elapses**
   The background worker is triggered on a fixed interval. This job runs independently of the event-processing path and is responsible for maintaining data correctness over time.

2. **The worker initiates stale location purging**
   Once triggered, the worker begins a cleanup cycle whose goal is to remove stale members from Redis Sorted Sets (ZSETs).
   This is necessary because Redis does not support per-member TTLs within a ZSET.

3. **The worker queries all known locations**
   The worker retrieves the list of active locations from the Redis Set that tracks all locations seen by the system.
   This bounds the cleanup operation to locations that have existed at least once, avoiding unnecessary scans.

4. **The worker processes each location independently**
   For each location returned, the worker performs cleanup in isolation.
   This design allows the job to scale linearly with the number of locations and enables partial progress even if a single location fails.

5. **Possible ZSET identifiers are generated for the location**
   For the current location, the worker deterministically generates all ZSET IDs that may exist for that location.
   This avoids relying on key scans and keeps the cleanup logic consistent with how ZSETs are written during normal event processing.

6. **Stale members are removed from each ZSET**
   For each generated ZSET, the worker removes members that are considered stale based on a time threshold (for example, using scores that represent timestamps).
   Members older than the cutoff are deleted, ensuring that only currently valid units contribute to the derived counts.

7. **Counts remain implicitly correct**
   Because counts are derived from ZSET cardinality, removing stale members automatically corrects the effective count without requiring explicit counter updates.

---

## Implementation Details

To simplify how we reason about the system, the application is divided into two conceptual layers: the application layer and the database layer. Each layer exposes a small set of interfaces that describe the behaviors required for real-time geospatial counting. By defining interfaces first, the system becomes easy to test, extend, and reason about independently of the underlying storage or transport mechanisms.

### Application Interfaces

The application layer is responsible for receiving events, converting coordinates to location identifiers, and delegating mutations to the database layer.

- **RegisterUnit(ctx, event)**  
    Accepts an incoming event, computes its location index, and forwards the update to the database layer.
- **GetReading(ctx, locationIndex)**  
    Retrieves the current counts for all tracked metric types within a given location.

These interfaces intentionally avoid prescribing where the data is stored or how increments are applied. The only concern at this layer is to validate inputs and normalize everything into a consistent format.

### Database Interfaces

The database layer handles all direct communication with Redis and abstracts how the data is stored, incremented, and retrieved.

- **RegisterUnit(ctx, locationIndex, metricType, action)**  
    Applies an increment or decrement for a given metric inside the appropriate Redis ZSET.
- **GetReading(ctx, locationIndex)**  
    Returns the current score of each metric stored under a location’s key.
- **PurgeReadings(ctx, locationIndex)**  
    Removes stale data or resets counters when required by the application.

This separation provides a clean contract: the application layer determines _what_ to update, while the database layer determines _how_ to perform the operation efficiently.

---

### Mapping Events to Location Keys

Each incoming event contains enough information for the application to determine which location it belongs to. The process looks like:

1. Extract latitude and longitude from the event.
2. Compute the H3 cell index using the configured resolution.
3. Use the resulting H3 index as the logical "location key".

A simplified example:

```go
func (s *Service) RegisterUnit(ctx context.Context, e Event) error {
    idx := h3.FromGeo(e.Latitude, e.Longitude, s.cfg.H3Resolution)
    return s.db.RegisterUnit(ctx, idx, e.Type, e.Action)
}
```

This keeps the application layer extremely simple: it transforms geographic data into an index and delegates all state management downstream.

---

### Redis Schema and Data Model

The system uses one Redis ZSET per location. Each ZSET stores multiple metric types (e.g., supply, demand) as its members, and the score associated with each member represents the current count.

For a given H3 cell:

```
Key:   geo:{h3_index}
Type:  ZSET
Members:
    metricType -> score
```

If the system tracks metrics like `supply`, `demand`, or any other domain-specific category, the ZSET structure stays the same.

This model works because:

- ZSET provides atomic `ZINCRBY`, which is ideal for high-volume increments and decrements.
- Members are lightweight strings representing metric types.
- The same location key can support arbitrary metrics without schema migration.

---

### Writing Counts: RegisterUnit Implementation

The database implementation of `RegisterUnit` converts an event action into a delta:

- `increase` -> `+1`
- `decrease` -> `-1`

Then it performs a single Redis command:

```
ZINCRBY geo:{locationIndex} {delta} {metricType}
```

A typical implementation:

```go
func (r *RedisDB) RegisterUnit(ctx context.Context, loc string, metric string, action string) error {
    delta := 1.0
    if action == "decrease" {
        delta = -1.0
    }

    return r.client.ZIncrBy(ctx, fmt.Sprintf("geo:%s", loc), delta, metric).Err()
}
```

This operation is atomic and extremely fast, which is critical when thousands of events arrive every second.

---

### Reading Counts: GetReading Implementation

Reading is straightforward. The database layer retrieves all metrics for a location:

```go
func (r *RedisDB) GetReading(ctx context.Context, loc string) (map[string]float64, error) {
    items, err := r.client.ZRangeWithScores(ctx, fmt.Sprintf("geo:%s", loc), 0, -1).Result()
    if err != nil {
        return nil, err
    }

    res := make(map[string]float64)
    for _, item := range items {
        res[item.Member.(string)] = item.Score
    }
    return res, nil
}
```

`ZRANGE` gives the full picture of a location’s metrics in a single lookup.

---

### Purging or Resetting Locations

Depending on system requirements, some locations may need to be reset, either for TTL reasons or because the domain requires periodic clearing of counters.

An example implementation:

```go
func (r *RedisDB) PurgeReadings(ctx context.Context, loc string) error {
    return r.client.Del(ctx, fmt.Sprintf("geo:%s", loc)).Err()
}
```

This is optional but useful if storage grows unbounded.

---

### End-to-End Flow Example

1. Event arrives:
    ```
    type=“supply”  
    action=“increase”  
    lat=14.55, lng=121.02
    ```
2. Application layer computes H3 index.
3. Application calls `RegisterUnit` on the DB layer.
4. DB executes `ZINCRBY`.
5. A subsequent `GetReading` returns the updated counts.

This ensures the entire pipeline is predictable, low-latency, and easy to reason about.
