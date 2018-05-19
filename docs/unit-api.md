---
id: unit-api
title: Unit API
---

You can call `getUnit()` on a space to retrieve the unit located there (but keep
in mind that not all spaces have units on them):

```js
const unit = space.getUnit();
```

You can call methods on a unit to know more about it.

Here are the various methods that are available to you:

## `unit.isBound()`:

Determines if the unit is bound.

**Returns**

_(boolean)_: Whether this unit is bound or not.

## `unit.isHostile()`:

Determines if the unit is hostile. A bound unit is not considered hostile.

**Returns**

_(boolean)_: Whether this is a hostile unit or not.

## `unit.isFriendly()`:

Determines if the unit is friendly.

**Returns**

_(boolean)_: Whether this is a friendly unit or not.

## `unit.isWarrior()`:

Determines if the unit is the warrior.

**Aliases**

_`unit.isPlayer()`_

**Returns**

_(boolean)_: Whether this unit is the warrior or not.
