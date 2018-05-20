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

Determines if the unit is hostile.

**Returns**

_(boolean)_: Whether this is a hostile unit or not.
