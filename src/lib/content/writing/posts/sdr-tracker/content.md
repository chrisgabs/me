---
title: "Building a Real-Time Geospatial Supply and Demand Tracker with Redis ZSET"
description: "My first blog post"
date: "2025-11-16"
---

## Goal:

Build a high-performance read/write system to monitor supply and demand metrics at scale for thousands of locations.

## Introduction

Real-time geospatial systems are challenging because they require fast writes, fast reads, and a reliable way to maintain state across large geographic areas. In my case, I needed to track supply and demand events across thousands of different locations, with constant updates coming in every second. Traditional relational databases could not keep up with the write volume and latency requirements.

Redis, specifically Redis Sorted Sets (ZSET), ended up being the core building block of the solution. In this blog I will walk through how I implemented a real-time geospatial supply and demand tracker in Go using Redis ZSET, why the data model works, and the lessons I learned along the way.

My goal is for this to serve as a practical guide for engineers facing similar challenges.

---

## Glossary Context:

Real-time
- A system that processes and updates information instantly or with minimal delay to reflect current conditions.
- The definition may differ depending on the business needs. The requirement on what constitutes as "real time" in my usecase will be elaborated further

Supply and Demand
- A unit representing something, in the context of uber for example, supply could be taxis in the area and demand could be the customer finding a ride. 
- A single unit of supply may supply multiple units of demand etc
- The only information we need is the count, so we need to answer: for a given location, how many supply and demand is in the area?

---

## Tools used:

### Location indexing
- I first needed to come up with a system where I can easily index or group a set of coordinates to be part of a given "location". My solution to this was to use Uber's h3 system.
- As per the official documentation: H3 is a discrete global grid system for indexing geographies into a hexagonal grid, developed at Uber.
- H3 is relatively lightweight where we can easily get the h3 index of a given lat,lng.
- The sizes of the h3 "cells" can be varied so we can use a specific resolution depending on how high resolution we need the location counting to be.
![[Pasted image 20251201003059.png]]

### Database layer:
- As mentioned in the introduction, I used redis specifically its ZSET data type to store the supply and demand counts per location.
- Redis is a key-value store stored in-memory built for high performance low latency operations such as our use case.
- ZSET is an ordered set, so in a key-value pair, the value is a bucket of members where a member has a "score" attached to it. The score is the score in which we order the members of the bucket.

---

## The setup:

- We consume an event that states whether it is a demand or supply. And also the location and ID of this demand or supply. A sample event model would look like:

| attribute | type   | notes               |
| --------- | ------ | ------------------- |
| id        | uuid   |                     |
| type      | string | e.g. supply, demand |

- sample event:

```json
{
	"id": "0000000",
	"type": "supply"
}
```
