---
id: towers
title: Towers
---

A **tower** is a WarriorJS world. In addition to defining levels, towers can
also add new abilities, effects, and units to the game.

WarriorJS CLI ships with an entry-level tower built-in. You'll need to install
any additional tower you want to play.

## Installing Towers

Towers are automatically loaded if you have them installed in the same
`node_modules` directory where `@warriorjs/cli` is located. This means that if
you have installed the game globally, you'll need to install additional towers
globally. If, on the other hand, you're running the game from a local
installation, you'll need to install additional towers locally.

Tower package names start with `@warriorjs/tower-` for official towers, or
`warriorjs-tower-` for community towers.

### Official Towers

- [`@warriorjs/tower-the-narrow-path`][warriorjs-tower-the-narrow-path]
- [`@warriorjs/tower-the-powder-keep`][warriorjs-tower-the-powder-keep] (beta)

### Community Towers

Have you made a tower? [Add it][add-community-tower] to the list!

## Making Towers

Follow this [guide](maker/introduction.md).

[warriorjs-tower-the-narrow-path]:
  https://github.com/olistic/warriorjs/tree/master/packages/warriorjs-tower-the-narrow-path
[warriorjs-tower-the-powder-keep]:
  https://github.com/olistic/warriorjs/tree/master/packages/warriorjs-tower-the-powder-keep
[add-community-tower]:
  https://github.com/olistic/warriorjs/edit/master/docs/player/towers.md
