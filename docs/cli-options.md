---
id: cli-options
title: CLI Options
---

There are various options you can pass to the `warriorjs` command to customize
the game. You can run `warriorjs --help` to see all the available options.

Here is a detailed list:

## `--directory <path>`

Path to a directory under which to run the game. By default, the current working
directory is used.

## `--level <number>` (epic mode only)

Practice a level. Use this option on levels you are having difficulty or want to
fine-tune the scoring.

## `--silent`

Suppress play log. Use this option if you just care about the outcome of playing
a level, and not each step of the play.

## `--time <seconds>`

Delay each turn by seconds. By default, each step of each turn is delayed by 0.6
seconds.

## `--yes`

Assume yes in non-destructive confirmation dialogs.
