---
id: space-api
title: Space API
---

As a maker, you call the same methods the player call on a sensed space, but on
a regular space.

## Class Methods

Here are the various methods that are available to you:

### `space.isEmpty()`:

Determines if nothing (except maybe stairs) is at this space.

**Returns**

_(boolean)_: Whether this space is empty or not.

### `space.isStairs()`

Determines if the stairs are at this space.

**Returns**

_(boolean)_: Whether the stairs are at this space or not.

### `space.isWall()`

Determines if this is the edge of the level.

**Returns**

_(boolean)_: Whether this space is a wall or not.

### `space.isUnit()`

Determines if there's a unit at this space.

**Returns**

_(boolean)_: Whether a unit is at this space or not.

### `space.getUnit()`

Returns the unit located at this space (if any).

**This unit will be a regular unit, not a sensed unit.**

**Returns**

_(Unit)_: The unit at this location or `undefined` if there's none.

## Instance Properties

### `location` _(number[])_

The absolute location of this space as the pair of coordinates `[x, y]`.
