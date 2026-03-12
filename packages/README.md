# Packages

This is a multi-package repository. That means that the codebase is separated
into independently versioned packages for better code and infrastructure
sharing.

Here is the list of packages with a brief description:

| Package                                                                   | Version                                                                                  |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [`@warriorjs/core`][warriorjs-core]                                       | [![npm][warriorjs-core-badge]][warriorjs-core-npm]                                       |
| [`@warriorjs/helper-get-level-config`][warriorjs-helper-get-level-config] | [![npm][warriorjs-helper-get-level-config-badge]][warriorjs-helper-get-level-config-npm] |
| [`@warriorjs/helper-get-level-score`][warriorjs-helper-get-level-score]   | [![npm][warriorjs-helper-get-level-score-badge]][warriorjs-helper-get-level-score-npm]   |
| [`@warriorjs/helper-get-grade-letter`][warriorjs-helper-get-grade-letter] | [![npm][warriorjs-helper-get-grade-letter-badge]][warriorjs-helper-get-grade-letter-npm] |
| [`@warriorjs/spatial`][warriorjs-spatial]                             | [![npm][warriorjs-spatial-badge]][warriorjs-spatial-npm]                             |
| [`@warriorjs/abilities`][warriorjs-abilities]                             | [![npm][warriorjs-abilities-badge]][warriorjs-abilities-npm]                             |
| [`@warriorjs/effects`][warriorjs-effects]                                 | [![npm][warriorjs-effects-badge]][warriorjs-effects-npm]                                 |
| [`@warriorjs/units`][warriorjs-units]                                     | [![npm][warriorjs-units-badge]][warriorjs-units-npm]                                     |
| [`@warriorjs/cli`][warriorjs-cli]                                         | [![npm][warriorjs-cli-badge]][warriorjs-cli-npm]                                         |

- [`@warriorjs/core`][warriorjs-core] is where the game mechanics are
  implemented; it exposes the `warriorjs.runLevel` function to run the given
  level with the given code and return the result of that run.
- [`@warriorjs/helper-get-level-config`][warriorjs-helper-get-level-config]
  exposes a helper function to get the config for a level defined in a tower, to
  use as input for the functions exposed by the core.
- [`@warriorjs/helper-get-level-score`][warriorjs-helper-get-level-score]
  exposes a helper function to get a level's score.
- [`@warriorjs/helper-get-grade-letter`][warriorjs-helper-get-grade-letter]
  exposes a helper function to get the letter for a numeric grade.
- [`@warriorjs/helper-get-level-config`][warriorjs-helper-get-level-config]
  exposes a helper function to get the config for a level defined in a tower, to
  use as input for the functions exposed by the core.
- [`@warriorjs/spatial`][warriorjs-spatial] exposes some constants and
  functions related to directioning (absolute and relative) of units and
  abilities in the game.
- [`@warriorjs/abilities`][warriorjs-abilities] defines the abilities that are
  used in the official towers.
- [`@warriorjs/effects`][warriorjs-effects] defines the effects that are used in
  the official towers.
- [`@warriorjs/units`][warriorjs-units] defines the units that are used in the
  official towers.
- [`@warriorjs/cli`][warriorjs-cli] is the original version of WarriorJS,
  playable from the terminal.

## [Towers](https://warrior.js.org/docs/player/towers)

The towers available in WarriorJS are independent packages that add new
universes (levels, abilities and units) to the game.

| Package                                                             | Version                                                                            |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [`@warriorjs/tower-the-narrow-path`][warriorjs-tower-the-narrow-path]   | [![npm][warriorjs-tower-the-narrow-path-badge]][warriorjs-tower-the-narrow-path-npm]   |
| [`@warriorjs/tower-the-powder-keep`][warriorjs-tower-the-powder-keep] | [![npm][warriorjs-tower-the-powder-keep-badge]][warriorjs-tower-the-powder-keep-npm] |

- [`@warriorjs/tower-the-narrow-path`][warriorjs-tower-the-narrow-path] is "The Narrow
  Path", the entry-level tower. You should play this first.
- [`@warriorjs/tower-the-powder-keep`][warriorjs-tower-the-powder-keep] is "The
  Powder Keep", a more challenging tower.

> You can find community maintained towers in [npm][community-towers-npm].

[warriorjs-core]: /packages/warriorjs-core
[warriorjs-core-badge]:
  https://img.shields.io/npm/v/@warriorjs/core.svg?style=flat-square
[warriorjs-core-npm]: https://www.npmjs.com/package/@warriorjs/core
[warriorjs-helper-get-level-config]: /packages/warriorjs-helper-get-level-config
[warriorjs-helper-get-level-config-badge]:
  https://img.shields.io/npm/v/@warriorjs/helper-get-level-config.svg?style=flat-square
[warriorjs-helper-get-level-config-npm]:
  https://www.npmjs.com/package/@warriorjs/helper-get-level-config
[warriorjs-helper-get-level-score]: /packages/warriorjs-helper-get-level-score
[warriorjs-helper-get-level-score-badge]:
  https://img.shields.io/npm/v/@warriorjs/helper-get-level-score.svg?style=flat-square
[warriorjs-helper-get-level-score-npm]:
  https://www.npmjs.com/package/@warriorjs/helper-get-level-score
[warriorjs-helper-get-grade-letter]: /packages/warriorjs-helper-get-grade-letter
[warriorjs-helper-get-grade-letter-badge]:
  https://img.shields.io/npm/v/@warriorjs/helper-get-grade-letter.svg?style=flat-square
[warriorjs-helper-get-grade-letter-npm]:
  https://www.npmjs.com/package/@warriorjs/helper-get-grade-letter
[warriorjs-spatial]: /packages/warriorjs-spatial
[warriorjs-spatial-badge]:
  https://img.shields.io/npm/v/@warriorjs/spatial.svg?style=flat-square
[warriorjs-spatial-npm]: https://www.npmjs.com/package/@warriorjs/spatial
[warriorjs-abilities]: /packages/warriorjs-abilities
[warriorjs-abilities-badge]:
  https://img.shields.io/npm/v/@warriorjs/abilities.svg?style=flat-square
[warriorjs-abilities-npm]: https://www.npmjs.com/package/@warriorjs/abilities
[warriorjs-effects]: /packages/warriorjs-effects
[warriorjs-effects-badge]:
  https://img.shields.io/npm/v/@warriorjs/effects.svg?style=flat-square
[warriorjs-effects-npm]: https://www.npmjs.com/package/@warriorjs/effects
[warriorjs-units]: /packages/warriorjs-units
[warriorjs-units-badge]:
  https://img.shields.io/npm/v/@warriorjs/units.svg?style=flat-square
[warriorjs-units-npm]: https://www.npmjs.com/package/@warriorjs/units
[warriorjs-cli]: /packages/warriorjs-cli
[warriorjs-cli-badge]:
  https://img.shields.io/npm/v/@warriorjs/cli.svg?style=flat-square
[warriorjs-cli-npm]: https://www.npmjs.com/package/@warriorjs/cli
[warriorjs-tower-the-narrow-path]: /packages/warriorjs-tower-the-narrow-path
[warriorjs-tower-the-narrow-path-badge]:
  https://img.shields.io/npm/v/@warriorjs/tower-the-narrow-path.svg?style=flat-square
[warriorjs-tower-the-narrow-path-npm]:
  https://www.npmjs.com/package/@warriorjs/tower-the-narrow-path
[warriorjs-tower-the-powder-keep]: /packages/warriorjs-tower-the-powder-keep
[warriorjs-tower-the-powder-keep-badge]:
  https://img.shields.io/npm/v/@warriorjs/tower-the-powder-keep.svg?style=flat-square
[warriorjs-tower-the-powder-keep-npm]:
  https://www.npmjs.com/package/@warriorjs/tower-the-powder-keep
[community-towers-npm]: https://www.npmjs.com/search?q=warriorjs-tower
