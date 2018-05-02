---
id: gameplay
title: Gameplay
---

The play happens through a series of turns. On each one, your `playTurn` method
is called along with any enemy's.

## Code

You need to fill the `playTurn` method with logic to teach the warrior what to
do depending on the situation.

See the README in your profile's directory for details on what's on this level's
floor and what abilities your warrior has available to deal with it.

Here is an example which will instruct the warrior to attack if he feels an
enemy, otherwise he'll walk forward:

```js
class Player {
  playTurn(warrior) {
    if (warrior.feel().isEnemy()) {
      warrior.attack();
    } else {
      warrior.walk();
    }
  }
}
```

> This is assuming you have `feel`, `attack` and `walk` abilities available.

## Play

Once you're done editing `Player.js`, save the file and run the `warriorjs`
command again to start playing the level.

You cannot change your code in the middle of a level, so you must take into
account everything that may happen on that level and give your warrior the
proper instructions from the start.

## Outcome

Losing all of your health will cause you to fail the level. You're not punished
by this, you simply need to go back to your `Player.js` file, improve your code,
and try again.

Once you pass a level (by reaching the stairs), the README will be updated for
the next level. Alter the `Player.js` file and run `warriorjs` again to play the
next level.
