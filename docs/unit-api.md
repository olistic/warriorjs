---
id: unit-api
title: Unit API
---

After using one of your senses and getting a space, you can call `getUnit()` on
it to retrieve the unit located there (if any). Continuing with the beginner
tower example:

```js
const unit = warrior.feel().getUnit();
```

> Keep in mind that not all spaces have units on them, so you may want to check
> that before calling any method on the unit (`getUnit()` will return
> `undefined` if there's no unit).

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

## `unit.isUnderEffect(effect)`:

Determines if the unit is under the given effect.

**Arguments**

`effect` _(string)_: The name of the effect.

**Returns**

_(boolean)_: Whether this unit is under the given effect or not.
