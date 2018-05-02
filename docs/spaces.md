---
id: spaces
title: Spaces
---

A space is an object representing a square in the level. Whenever you sense an
area, often one or multiple spaces (in an array) will be returned.

You can call methods on a space to gather information about what is there. Here
are the various methods that are available to you:

## `space.isEmpty()`:

If `true`, this means that nothing (except maybe stairs) is at this location.
You can move here.

## `space.isWall()`:

Returns `true` if this is the edge of the level. You can't move here.

## `space.isStairs()`:

Determines if the stairs are at this location.

## `space.isEnemy()`:

Determines if an enemy unit is at this location. A bound unit doesn't count as
an enemy.

## `space.isCaptive()`:

Determines if a captive unit is at this location.

## `space.isBound()`:

Determines if the unit located at this space is bound.

## `space.isUnderEffect(effect)`:

Determines if the unit located at this space is under the given effect.
