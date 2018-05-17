---
id: space-api
title: Space API
---

You can call methods on a space to gather information about what's there.

Here are the various methods that are available to you:

## `space.isEmpty()`:

Determines if nothing (except maybe stairs) is at this location.

**Returns**

_(boolean)_: Whether this space is empty or not.

## `space.isStairs()`:

Determines if the stairs are at this location.

**Returns**

_(boolean)_: Whether the stairs are at this space or not.

## `space.isWall()`:

Determines if this is the edge of the level.

**Returns**

_(boolean)_: Whether this space is a wall or not.

## `space.isUnit()`:

Determines if there's a unit at this location.

**Returns**

_(boolean)_: Whether a unit is at this space or not.

## `space.getUnit()`:

Returns the unit located at this space (if any).

**Returns**

_(Unit)_: The unit at this location.

## `space.getLocation()`:

Returns the location of this space.

**Returns**

_(number[])_: The location of this space as a pair of coordinates [x, y].
