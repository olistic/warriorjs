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

## `space.isWall()`:

Determines if this is the edge of the level.

**Returns**

_(boolean)_: Whether this space is a wall or not.

## `space.isStairs()`:

Determines if the stairs are at this location.

**Returns**

_(boolean)_: Whether the stairs are at this space or not.

## `space.isFriendly()`:

Determines if a friendly unit is at this location.

**Returns**

_(boolean)_: Whether a friendly unit is at this space or not.

## `space.isHostile()`:

Determines if an enemy unit is at this location. A bound unit doesn't count as a
hostile.

**Returns**

_(boolean)_: Whether an enemy unit is at this space or not.

## `space.isEnemy()`: `(deprecated)`

**Deprecated in favor of `space.isHostile()`**

Determines if a hostile unit is at this location. A bound unit doesn't count as
hostile.

**Returns**

_(boolean)_: Whether a hostile unit is at this space or not.

## `space.isWarrior()`:

Determines if the warrior is at this location.

**Aliases**

_`space.isPlayer()`_

**Returns**

_(boolean)_: Whether the warrior is at this space or not.

## `space.isBound()`:

Determines if the unit located at this space (if any) is bound.

**Returns**

_(boolean)_: Whether the unit at this space is bound or not.

## `space.isUnderEffect(effect)`:

Determines if the unit located at this space (if any) is under the given effect.

**Arguments**

`effect` _(string)_: The name of the effect.

**Returns**

_(boolean)_: Whether the unit at this space is under the given effect or not.
