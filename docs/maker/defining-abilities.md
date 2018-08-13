---
id: defining-abilities
title: Defining Abilities
---

An ability is a JavaScript function that receives the unit that possesses the
ability as the only parameter and returns a JavaScript object:

```js
function walk(unit) {
  return {
    // Ability definition.
  };
}
```

The walk ability is an action, so first of all let's indicate that:

```js
function walk(unit) {
  return {
    action: true,
  };
}
```

Then, we need to write a description for the ability so that the player knows
what it does:

```js
function walk(unit) {
  return {
    action: true,
    description: 'Move one space in the given direction (forward by default).',
  };
}
```

And last but not least, we need to write the ability's logic in the `perform`
function. Here, we can use any of the methods in the
[Unit Maker API](maker/unit-api.md). Let's do that:

```js
function walk(unit) {
  return {
    action: true,
    description: 'Move one space in the given direction (forward by default).',
    perform(direction = 'forward') {
      const space = unit.getSpaceAt(direction);
      if (space.isEmpty()) {
        unit.move(direction);
        unit.log(`walks ${direction}`);
      } else {
        unit.log(`walks ${direction} and bumps into ${space}`);
      }
    },
  };
}
```

Abilities are are added to the units under a key in the `abilities` object.
Let's add the walk ability to the Warrior under the `walk` key (because we want
the player to invoke it by calling `warrior.walk()`):

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
      abilities: {
        walk: walk,
      },
    },
  },
};
```

For the second level, we need to add two more abilities: attack and feel.

First, let's define the attack ability:

```js
function valyrianSteelSwordAttack(unit) {
  return {
    action: true,
    description:
      'Attack a unit in the given direction (forward by default) with your Valyrian steel sword, dealing 5 HP of damage.',
    perform(direction = 'forward') {
      const receiver = unit.getSpaceAt(direction).getUnit();
      if (receiver) {
        unit.log(`attacks ${direction} and hits ${receiver}`);
        unit.damage(receiver, 5);
      } else {
        unit.log(`attacks ${direction} and hits nothing`);
      }
    },
  };
}
```

Secondly, let's define the feel ability. Contrary to attack, feel is a sense, so
we can omit the `action` key:

```js
function feel(unit) {
  return {
    description:
      'Return the adjacent space in the given direction (forward by default).',
    perform(direction = 'forward') {
      return unit.getSensedSpaceAt(direction);
    },
  };
}
```

> **IMPORTANT:** When returning one or multiple spaces from senses, use
> `unit.getSensedSpaceAt()` instead of `unit.getSpaceAt()`. The former returns a
> space that exposes only the [Space Player API](player/space-api.md), whereas
> the latter exposes the [Space Maker API](maker/space-api.md) and is meant to
> be used internally, like in the attack ability before.

Finally, let's add them to the Warrior of the second level:

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
      abilities: {
        attack: valyrianSteelSwordAttack,
        feel: feel,
      },
    },
  },
};
```

> We don't add the walk ability again in the second level because the Warrior
> already learned it in the first level.

This is very nice, but the Warrior is not wielding that Valyrian steel sword for
nothing. Let's add an enemy he can fight!
