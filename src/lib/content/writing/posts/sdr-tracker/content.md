---
title: "Building a Real-Time Geospatial Supply and Demand Tracker with Redis ZSET"
description: "My first blog post"
date: "2025-11-16"
---

## Goal

Build a high-performance read/write system capable of monitoring count-based metrics across thousands of geospatial locations.

## Introduction

Real-time geospatial systems are difficult to build because they demand low-latency reads, high-throughput writes, and a consistent way to maintain state across large geographic areas. In my case, I needed to track different types of countable units—commonly referred to as supply and demand—across thousands of locations, with continuous updates occurring every second. Traditional relational databases were not designed to handle this level of write volume while maintaining strict latency requirements.

Redis, and in particular Redis Sorted Sets (ZSET), became the core foundation of the solution. In this blog, I will walk through how I implemented a real-time geospatial tracking system in Go using Redis ZSET, why the data model fits this use case, and some of the key lessons learned throughout the process.

My goal is to provide a practical guide for engineers who may be implementing something similar.

---

## Glossary

**Real-time**

- A system that processes and updates information with minimal delay relative to when events occur.
- The threshold for what qualifies as “real-time” varies by use case. I will describe the specific performance requirements of this implementation in later sections.

**Countable Units (previously referred to as Supply and Demand)**

- A unit representing any entity contributing to a metric. In ride-hailing scenarios, this might be available drivers (supply) and customer requests (demand).
- A single unit of one type may satisfy multiple units of another type, depending on business rules.
- For the purpose of this system, the only requirement is the ability to answer a simple question: for a given location, how many units of each type are currently present?

---

## Tools Used

### Location Indexing

To aggregate real-time events by geographic area, I first needed a method to map coordinates to a consistent, indexable “location.” I chose Uber’s H3 system.
- H3 is a discrete global grid system that partitions the Earth into hexagonal cells.
- It provides a lightweight interface for converting latitude and longitude into an H3 index.
- Cell size can be tuned by selecting different H3 resolutions, allowing the system to operate at varying levels of geographic precision.

```
[ Insert H3 diagram here ]
```

### Database Layer

As described in the introduction, Redis served as the primary data store, with Redis Sorted Sets (ZSET) used to maintain the counts for each location.

- Redis is an in-memory key-value store optimized for high-throughput, low-latency operations, making it well-suited for real-time workloads.
- A ZSET stores unique members ordered by a numeric score.
- This ordering enables efficient increments, decrements, range queries, and filtered lookups—capabilities essential for tracking dynamic counts.

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

## The Setup
