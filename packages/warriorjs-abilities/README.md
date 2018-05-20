# @warriorjs/abilities

> WarriorJS base abilities.

## [Actions][actions]

### `unit.attack([direction])`:

Attack a unit in the given direction (forward by default) dealing `[power]` HP
of damage.

### `unit.bind([direction])`:

Bind a unit in the given direction (forward by default) to keep him from moving.

### `unit.detonate([direction])`:

Detonate a bomb in a given direction (forward by default) dealing
`[targetPower]` HP of damage to that space and `[surroundingPower]` HP of damage
to surrounding 4 spaces (including yourself).

### `unit.pivot([direction])`:

Rotate in the given direction (backward by default).

### `unit.rescue([direction])`:

Release a unit from his chains in the given direction (forward by default).

### `unit.rest()`:

Gain `[healthGainPercentage]` of max health back, but do nothing more.

### `unit.shoot([direction])`:

Shoot your bow & arrow in the given direction (forward by default) dealing
`[power]` HP of damage to the first unit in a range of `[range]` spaces.

### `unit.walk([direction])`:

Move one space in the given direction (forward by default).

## [Senses][senses]

### `unit.directionOf(space)`:

Return the direction (forward, right, backward or left) to the given
[space][spaces].

### `unit.directionOfStairs()`:

Return the direction (forward, right, backward or left) the stairs are from your
location.

### `unit.distanceOf(space)`:

Return an integer representing the distance to the given [space][spaces].

### `unit.feel([direction])`:

Return the adjacent [space][spaces] in the given direction (forward by default).

### `unit.health()`:

Return an integer representing your health.

### `unit.listen()`:

Return an array of all [spaces][spaces] which have units in them (excluding
yourself).

### `unit.look([direction])`:

Returns an array of up to `[range]` [spaces][spaces] in the given direction
(forward by default).

[actions]: https://warrior.js.org/docs/abilities#actions
[senses]: https://warrior.js.org/docs/abilities#senses
[spaces]: https://warrior.js.org/docs/spaces

### `unit.think(thought)`:

Think about your options before choosing an action.

[actions]: https://warrior.js.org/docs/abilities#actions
[senses]: https://warrior.js.org/docs/abilities#senses
[spaces]: https://warrior.js.org/docs/spaces
