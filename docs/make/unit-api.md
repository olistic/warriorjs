---
id: unit-api
title: Unit API
---

As a maker, you call methods on units when writing the logic for the abilities
you create.

## Class Methods

Here are the various methods that are available to you:

### `unit.heal(amount)`

Adds the given amount of health in HP.

Health can't go over max health.

**Arguments**

`amount` _(number)_: The amount of HP to add.

### `unit.takeDamage(amount)`

Subtracts the given amount of health in HP.

If the unit is bound, it will unbound when taking damage.

Health can't go under zero. If it reaches zero, the unit will die and vanish
from the floor.

**Arguments**

`amount` _(number)_: The amount of HP to subtract.

### `unit.damage(receiver, amount)`

Damages another unit.

If the other unit dies, the damager will earn or lose points equal to the dead
unit's reward depending on whether that unit was an enemy or a friend,
respectively.

**Arguments**

`receiver` _(Unit)_: The unit to damage.

`amount` _(number)_: The amount of HP to inflict.

### `unit.isAlive()`

Determines if the unit is alive.

A unit is alive if it has a position.

**Returns**

_(boolean)_: Whether the unit is alive or not.

### `unit.release(unit)`

Releases (unbinds) another unit.

If the other unit was a friend, the releaser will earn points equal to the
released unit's reward.

**Arguments**

`receiver` _(Unit)_: The unit to release.

### `unit.unbind()`

Unbinds the unit.

### `unit.bind()`

Binds the unit.

### `unit.isBound()`

Determines if the unit is bound.

**Returns**

_(boolean)_: Whether this unit is bound or not.

### `unit.earnPoints(points)`

Adds the given points to the score.

**Arguments**

`points` _(number)_: The points to earn.

### `unit.losePoints(points)`

Subtracts the given points from the score.

**Arguments**

`points` _(number)_: The points to lose.

### `unit.triggerEffect(effect)`

Triggers the given effect.

**Arguments**

`effect` _(string)_: The name of the effect.

### `unit.isUnderEffect(effect)`

Determines if the unit is under the given effect.

**Arguments**

`effect` _(string)_: The name of the effect.

**Returns**

_(boolean)_: Whether this unit is under the given effect or not.

### `unit.getOtherUnits()`

Returns the units in the floor minus this unit.

**Returns**

_(Unit[])_: The other units in the floor.

### `unit.getSpace()`

Returns the space where this unit is located.

**Returns**

_(Space)_: The space this unit is located at.

### `unit.getSensedSpaceAt(direction, forward = 1, right = 0)`

Returns the sensed space located at the direction and number of spaces.

Use this method when returning spaces from senses. **Always return sensed spaces
to the player.**

**Arguments**

`direction` _(string)_: The direction.

`forward` _(number)_: The number of spaces forward.

`right` _(number)_: The number of spaces to the right.

**Returns**

_(SensedSpace)_: The sensed space.

### `unit.getSpaceAt(direction, forward = 1, right = 0)`

Returns the space located at the direction and number of spaces.

Use this method internally. **Never return a regular space to the player.**

**Arguments**

`direction` _(string)_: The direction.

`forward` _(number)_: The number of spaces forward.

`right` _(number)_: The number of spaces to the right.

**Returns**

_(Space)_: The space.

### `unit.getDirectionOfStairs()`

Returns the direction of the stairs with reference to this unit.

**Returns**

_(string)_: The relative direction of the stairs.

### `unit.getDirectionOf(space)`

Returns the direction of the given space with reference to this unit.

**Arguments**

`space` _(SensedSpace)_: The space to get the direction of.

**Returns**

_(string)_: The relative direction of the space.

### `unit.getDistanceOf(space)`

Returns the distance between the given space and this unit.

**Arguments**

`space` _(SensedSpace)_: The space to calculate the distance of.

**Returns**

_(number)_: The distance of the space.

### `unit.move(direction, forward = 1, right = 0)`

Moves the unit in the given direction and number of spaces.

**Arguments**

`direction` _(string)_: The direction.

`forward` _(number)_: The number of spaces forward.

`right` _(number)_: The number of spaces to the right.

### `unit.rotate(direction)`

Rotates the unit in a given direction.

**Arguments**

`direction` _(string)_: The direction in which to rotate.

### `unit.vanish()`

Vanishes the unit from the floor.

### `unit.log(message)`

Logs a message to the play log.

**Arguments**

`message` _(string)_: The message to log.

## Instance Properties

### `name` _(string)_

The name of the unit.

### `character` _(string)_

The character that represents the unit in the floor map.

### `health` _(number)_

The total damage the unit may take before dying, in HP.

### `maxHealth` _(number)_

The maximum `health` value.

### `reward` _(number)_

The number of points to reward when interacting.

### `enemy` _(boolean)_

Whether the unit belongs to the enemy side or not.

### `bound` _(boolean)_

Whether the unit is bound or not.
