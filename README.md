<div align="center">
  <a href="https://warrior.js.org">
    <img alt="WarriorJS Banner" title="WarriorJS" src="logo/warriorjs-banner-dark.png?raw=true">
  </a>
</div>

<br />

<div align="center">
  <strong>Learn JavaScript and TypeScript by writing code that fights</strong>
</div>

<br />

<div align="center">
  <a href="https://github.com/olistic/warriorjs/actions/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/github/actions/workflow/status/olistic/warriorjs/ci.yml?branch=master&style=flat-square">
  </a>
  <a href="https://codecov.io/gh/olistic/warriorjs">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/olistic/warriorjs.svg?style=flat-square">
  </a>
</div>

<br />

In WarriorJS, you write JavaScript or TypeScript to guide a warrior through
towers full of enemies. Each floor is a puzzle: battle sludge, dodge archers,
rescue captives, and reach the stairs alive. The code you write _is_ the
strategy — there's no clicking, no dragging, just logic and sharp thinking.

**Whether you're writing your first `if` statement or refactoring for a perfect
score, every floor will test you.**

## Quick Start

1. Install [Node.js](https://nodejs.org) 22 or later.

2. Install the CLI:

```sh
npm install --global @warriorjs/cli
```

3. Launch the game:

```sh
warriorjs
```

The game walks you through creating a warrior and choosing a tower. Open the
generated `README.md` for your first level's instructions, write your solution
in `Player.js`, then run `warriorjs` again to see how your warrior fares.

You can also play from your browser at
[warriorjs.com](https://warriorjs.com/?ref=gh).

## Documentation

The [official docs](https://warrior.js.org) cover everything from first steps
to building your own towers:

- [Gameplay](https://warrior.js.org/docs/player/gameplay)
- [Towers](https://warrior.js.org/docs/player/towers)
- [Player API](https://warrior.js.org/docs/player/space-api)

## Contributing

The best way to contribute is to build a
[tower](https://warrior.js.org/docs/player/towers) — a set of levels that
other players can install and play.

You can also fix bugs, improve the docs, or add new abilities and units.
See the [contribution guide](CONTRIBUTING.md) and
[Code of Conduct](CODE_OF_CONDUCT.md).

## Acknowledgments

This project was born as a port of
[ruby-warrior](https://github.com/ryanb/ruby-warrior). Credits for the original
idea go to [Ryan Bates](https://github.com/ryanb).

Special thanks to [Guillermo Cura](https://github.com/guillecura) for designing
a wonderful [logo](logo).

## License

WarriorJS is licensed under a [MIT License](LICENSE).
