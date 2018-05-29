---
id: towers
title: Towers
---

A **tower** is a WarriorJS world. In addition to defining levels, towers can
also add new abilities, effects, and units to the game.

The `@warriorjs/cli` package ships with a beginner tower built-in. You'll need
to install any additional tower you want to play.

## Installing Towers

Towers are automatically loaded if you have them installed in the same
`node_modules` directory where `@warriorjs/cli` is located. This means that if
you have installed the game globally, you'll need to install additional towers
globally. If, on the other hand, you're running the game from a local
installation, you'll need to install additional towers locally.

Tower package names must start with `@warriorjs/tower-` or `warriorjs-tower-` to
be registered.

### Official Towers

* [`@warriorjs/tower-beginner`][warriorjs-tower-beginner]
* [`@warriorjs/tower-intermediate`][warriorjs-tower-intermediate] (beta)

### Community Towers

Have you made a tower? [Add it][add-community-tower] to the list!

## Making Towers

_Coming soon._

[warriorjs-tower-beginner]: /packages/warriorjs-tower-beginner
[warriorjs-tower-intermediate]: /packages/warriorjs-tower-intermediate
[add-community-tower]: https://github.com/olistic/warriorjs/edit/master/docs/towers.md
