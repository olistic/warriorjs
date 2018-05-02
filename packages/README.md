# Packages

This is a multi-package repository. That means that the codebase is separated
into independently versioned packages for better code and infrastructure
sharing.

Here is the list of packages with a brief description:

| Package                                       | Version                                                      |
| --------------------------------------------- | ------------------------------------------------------------ |
| [`@warriorjs/core`][warriorjs-core]           | [![npm][warriorjs-core-badge]][warriorjs-core-npm]           |
| [`@warriorjs/geography`][warriorjs-geography] | [![npm][warriorjs-geography-badge]][warriorjs-geography-npm] |
| [`@warriorjs/abilities`][warriorjs-abilities] | [![npm][warriorjs-abilities-badge]][warriorjs-abilities-npm] |
| [`@warriorjs/effects`][warriorjs-effects]     | [![npm][warriorjs-effects-badge]][warriorjs-effects-npm]     |
| [`@warriorjs/units`][warriorjs-units]         | [![npm][warriorjs-units-badge]][warriorjs-units-npm]         |
| [`@warriorjs/cli`][warriorjs-cli]             | [![npm][warriorjs-cli-badge]][warriorjs-cli-npm]             |

* [`@warriorjs/core`][warriorjs-core] is where the game mechanics are
  implemented; it exposes the `warriorjs.runLevel` method to run the given level
  with the given code and return the result of that run.
* [`@warriorjs/geography`][warriorjs-geography] exposes some constants and
  methods related to directioning (absolute and relative) of units and abilities
  in the game.
* [`@warriorjs/abilities`][warriorjs-abilities] defines the abilities that are
  used in the official towers.
* [`@warriorjs/effects`][warriorjs-effects] defines the effects that are used in
  the official towers.
* [`@warriorjs/units`][warriorjs-units] defines the units that are used in the
  official towers.
* [`@warriorjs/cli`][warriorjs-cli] is the original version of WarriorJS,
  playable from the terminal.

## [Towers](https://warrior.js.org/docs/towers)

The towers available in WarriorJS are independent packages that add new
universes (levels, abilities and units) to the game.

| Package                                                         | Version                                                                        |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`@warriorjs/tower-beginner`][warriorjs-tower-beginner]         | [![npm][warriorjs-tower-beginner-badge]][warriorjs-tower-beginner-npm]         |
| [`@warriorjs/tower-intermediate`][warriorjs-tower-intermediate] | [![npm][warriorjs-tower-intermediate-badge]][warriorjs-tower-intermediate-npm] |

* [`@warriorjs/tower-beginner`][warriorjs-tower-beginner] is the entry-level
  tower. You should play this first.
* [`@warriorjs/tower-intermediate`][warriorjs-tower-intermediate] is a more
  challenging tower.

> You can find community maintained towers in [npm][community-towers-npm].

[warriorjs-core]: /packages/warriorjs-core
[warriorjs-core-badge]: https://img.shields.io/npm/v/@warriorjs/core.svg?style=flat-square
[warriorjs-core-npm]: https://www.npmjs.com/package/@warriorjs/core
[warriorjs-geography]: /packages/warriorjs-geography
[warriorjs-geography-badge]: https://img.shields.io/npm/v/@warriorjs/geography.svg?style=flat-square
[warriorjs-geography-npm]: https://www.npmjs.com/package/@warriorjs/geography
[warriorjs-abilities]: /packages/warriorjs-abilities
[warriorjs-abilities-badge]: https://img.shields.io/npm/v/@warriorjs/abilities.svg?style=flat-square
[warriorjs-abilities-npm]: https://www.npmjs.com/package/@warriorjs/abilities
[warriorjs-effects]: /packages/warriorjs-effects
[warriorjs-effects-badge]: https://img.shields.io/npm/v/@warriorjs/effects.svg?style=flat-square
[warriorjs-effects-npm]: https://www.npmjs.com/package/@warriorjs/effects
[warriorjs-units]: /packages/warriorjs-units
[warriorjs-units-badge]: https://img.shields.io/npm/v/@warriorjs/units.svg?style=flat-square
[warriorjs-units-npm]: https://www.npmjs.com/package/@warriorjs/units
[warriorjs-cli]: /packages/warriorjs-cli
[warriorjs-cli-badge]: https://img.shields.io/npm/v/@warriorjs/cli.svg?style=flat-square
[warriorjs-cli-npm]: https://www.npmjs.com/package/@warriorjs/cli
[warriorjs-tower-beginner]: /packages/warriorjs-tower-beginner
[warriorjs-tower-beginner-badge]: https://img.shields.io/npm/v/@warriorjs/tower-beginner.svg?style=flat-square
[warriorjs-tower-beginner-npm]: https://www.npmjs.com/package/@warriorjs/tower-beginner
[warriorjs-tower-intermediate]: /packages/warriorjs-tower-intermediate
[warriorjs-tower-intermediate-badge]: https://img.shields.io/npm/v/@warriorjs/tower-intermediate.svg?style=flat-square
[warriorjs-tower-intermediate-npm]: https://www.npmjs.com/package/@warriorjs/tower-intermediate
[community-towers-npm]: https://www.npmjs.com/search?q=warriorjs-tower
