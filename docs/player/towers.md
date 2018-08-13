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

- [`@warriorjs/tower-baby-steps`][warriorjs-tower-baby-steps]
- [`@warriorjs/tower-tick-tick-boom`][warriorjs-tower-tick-tick-boom] (beta)

### Community Towers

Have you made a tower? [Add it][add-community-tower] to the list!

## Making Towers

Follow this [guide](maker/introduction.md).

[warriorjs-tower-baby-steps]:
  https://github.com/olistic/warriorjs/tree/master/packages/warriorjs-tower-baby-steps
[warriorjs-tower-tick-tick-boom]:
  https://github.com/olistic/warriorjs/tree/master/packages/warriorjs-tower-tick-tick-boom
[add-community-tower]:
  https://github.com/olistic/warriorjs/edit/master/docs/player/towers.md
