---
id: adding-levels
title: Adding Levels
---

A level is another JavaScript object:

```js
const Level1 = {
  // Level definition.
};
```

Let's start off by writing a description and a tip for our level:

```js
const Level1 = {
  description:
    "You've entered the ancient castle of Eastwatch to escape from a blizzard. But it's deadly cold inside too.",
  tip:
    "Call `warrior.walk()` to walk forward in the Player's `playTurn` method.",
};
```

We also need to define two numbers: the time bonus and the ace score. The time
bonus is earned by the player depending on how fast they complete the level (it
is decremented turn by turn until it reaches zero). The ace score, on the other
hand, is used to calculate the level grade (in epic mode only). Any score
greater or equal to the ace score will get an S. Let's add those numbers:

```js
const Level1 = {
  description:
    "You've entered the ancient castle of Eastwatch to escape from a blizzard. But it's deadly cold inside too.",
  tip:
    "Call `warrior.walk()` to walk forward in the Player's `playTurn` method.",
  timeBonus: 15,
  aceScore: 10,
};
```

> These two numbers will need to be fine-tuned when play testing the tower. For
> this guide, we've already done that.

The next thing to do is to define the floor of the level, starting by its size:

```js
const Level1 = {
  description:
    "You've entered the ancient castle of Eastwatch to escape from a blizzard. But it's deadly cold inside too.",
  tip:
    "Call `warrior.walk()` to walk forward in the Player's `playTurn` method.",
  timeBonus: 15,
  aceScore: 10,
  floor: {
    size: {
      width: 8,
      height: 1,
    },
  },
};
```

Then, we need to position the stairs so that the Warrior can move to the next
level:

```js
const Level1 = {
  description:
    "You've entered the ancient castle of Eastwatch to escape from a blizzard. But it's deadly cold inside too.",
  tip:
    "Call `warrior.walk()` to walk forward in the Player's `playTurn` method.",
  timeBonus: 15,
  aceScore: 10,
  floor: {
    size: {
      width: 8,
      height: 1,
    },
    stairs: {
      x: 7,
      y: 0,
    },
  },
};
```

Speaking of warrior, let's define the Warrior for this level:

```js
const Level1 = {
  description:
    "You've entered the ancient castle of Eastwatch to escape from a blizzard. But it's deadly cold inside too.",
  tip:
    "Call `warrior.walk()` to walk forward in the Player's `playTurn` method.",
  timeBonus: 15,
  aceScore: 10,
  floor: {
    size: {
      width: 8,
      height: 1,
    },
    stairs: {
      x: 7,
      y: 0,
    },
    warrior: {
      character: '@',
      maxHealth: 20,
      position: {
        x: 0,
        y: 0,
        facing: 'east',
      },
    },
  },
};
```

With that, the level is complete. But before continuing, let's define another
level:

```js
const Level2 = {
  description:
    'The cold became more intense. In the distance, you see a pair of deep and blue eyes, a blue that burns like ice.',
  tip:
    "Use `warrior.feel().isEmpty()` to see if there's anything in front of you, and `warrior.attack()` to fight it. Remember, you can only do one action per turn.",
  clue:
    'Add an if/else condition using `warrior.feel().isEmpty()` to decide whether to attack or walk.',
  timeBonus: 20,
  aceScore: 26,
  floor: {
    size: {
      width: 8,
      height: 1,
    },
    stairs: {
      x: 7,
      y: 0,
    },
    warrior: {
      character: '@',
      maxHealth: 20,
      position: {
        x: 0,
        y: 0,
        facing: 'east',
      },
    },
  },
};
```

> As things started to get more challenging for the player, this time we added a
> clue. Clues are optional and will only be shown upon demand.

Now we need to add these two levels to the tower. Levels are added to the
`levels` array of the tower:

```js
module.exports = {
  name: 'Game of Thrones',
  description:
    'There is only one war that matters: the Great War. And it is here.',
  levels: [Level1, Level2],
};
```

Superb! But as you could have noticed, we instruct the player to call
`warrior.attack()`, `warrior.feel()`, and `warrior.walk()` but we haven't taught
the Warrior how to do any of that. Let's do that next!
