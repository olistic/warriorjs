---
id: space-api
title: Space API
---

Whenever you sense an area, often one or multiple spaces (in an array) will be
returned. For example, the "feel" sense in the beginner tower returns one space:

```js
const space = warrior.feel();
```

You can call methods on a space to gather information about what's there.

Here are the various methods that are available to you:

## `space.getLocation()`:

Returns the location of this space as the number of spaces forward and to the
right of your position.

**Returns**

_(number[])_: The relative location of this space as the offset
`[forward, right]`.

## `space.isEmpty()`:

Determines if nothing (except maybe stairs) is at this space.

**Returns**

_(boolean)_: Whether this space is empty or not.

## `space.isStairs()`:

Determines if the stairs are at this space.

**Returns**

_(boolean)_: Whether the stairs are at this space or not.

## `space.isWall()`:

Determines if this is the edge of the level.

**Returns**

_(boolean)_: Whether this space is a wall or not.

## `space.isUnit()`:

Determines if there's a unit at this space.

**Returns**

_(boolean)_: Whether a unit is at this space or not.

## `space.getUnit()`:

Returns the unit located at this space (if any).

**Returns**

_(Unit)_: The unit at this location or `undefined` if there's none.
