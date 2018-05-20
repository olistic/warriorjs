---
id: gameplay
title: Gameplay
---

The play happens through a series of turns. On each one and starting with your
warrior, the units in the floor will have the chance to use their abilities.

## Code

Open the `Player.js` file in your profile's directory. You should see some
starting code:

```js
class Player {
  playTurn(warrior) {
    // Cool code goes here.
  }
}
```

You need to fill the `playTurn` method with logic to teach the warrior what to
do depending on the situation.

See the README in your profile's directory for details on what's on the current
level and what abilities your warrior has available to deal with it.

Here is an example from the beginner tower which will instruct the warrior to
walk if there's nothing ahead, otherwise attack:

```js
class Player {
  playTurn(warrior) {
    if (warrior.feel().isEmpty()) {
      warrior.walk();
    } else {
      warrior.attack();
    }
  }
}
```

> This is assuming your warrior has "attack", "feel", and "walk" abilities
> available.

## Play

Once you're done editing `Player.js`, save the file and run the `warriorjs`
command again to start playing the level.

You cannot change your code in the middle of a level, so you must take into
account everything that may happen on that level and give your warrior the
proper instructions from the start.

## Outcome

Losing all of your health will cause you to fail the level. You're not punished
by this; just go back to the `Player.js` file, improve your code, and try again.

Once you pass a level (by reaching the stairs), the README will be updated for
the next level. Alter the `Player.js` file and run `warriorjs` again to play the
next level.
