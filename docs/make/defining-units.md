---
id: defining-units
title: Defining Units
---

A unit is a JavaScript object:

```js
const WhiteWalker = {
  // Unit definition.
};
```

Let's start off by adding the name of the unit:

```js
const WhiteWalker = {
  name: 'White Walker',
};
```

> We didn't add a name for the Warrior because it's supplied by the player
> during the game.

Just like the Warrior, other units also need a character and a max health value:

```js
const WhiteWalker = {
  name: 'White Walker',
  character: 'w',
  maxHealth: 12,
};
```

Let's define a new attack ability:

```js
function iceCrystalSwordAttack(unit) {
  return {
    action: true,
    description:
      'Attack a unit in the given direction (forward by default) with your ice blade, dealing 3 HP of damage.',
    perform(direction = 'forward') {
      const receiver = unit.getSpaceAt(direction).getUnit();
      if (receiver) {
        unit.log(`attacks ${direction} and hits ${receiver}`);
        unit.damage(receiver, 3);
      } else {
        unit.log(`attacks ${direction} and hits nothing`);
      }
    },
  };
}
```

And add it to the White Walker. Let's also add the same feel ability we'd
already defined:

```js
const WhiteWalker = {
  name: 'White Walker',
  character: 'w',
  maxHealth: 12,
  abilities: {
    attack: iceCrystalSwordAttack,
    feel: feel,
  },
};
```

Finally, we need to define the AI of our White Walker. It'll be a very
rudimentary AI: the White Walker will start his turn by feeling in every
direction looking for an enemy (the Warrior). If he finds it in any direction,
he'll attack in that direction. Let's write that logic in the `playTurn`
function:

```js
const WhiteWalker = {
  name: 'White Walker',
  character: 'w',
  maxHealth: 12,
  abilities: {
    attack: iceCrystalSwordAttack,
    feel: feel,
  },
  playTurn(whiteWalker) {
    const enemyDirection = ['forward', 'right', 'backward', 'left'].find(
      direction => {
        const unit = whiteWalker.feel(direction).getUnit();
        return unit && unit.isEnemy();
      },
    );
    if (enemyDirection) {
      whiteWalker.attack(enemyDirection);
    }
  },
};
```

> We didn't write the AI for the Warrior either because it's also supplied by
> the player during the game.

Now we need to add the White Walker to the second level. Units other than the
Warrior are added to the `units` array of the floor:

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
    units: [
      {
        ...WhiteWalker,
        position: {
          x: 4,
          y: 0,
          facing: 'west',
        },
      },
    ],
  },
};
```

> Here, we used spread properties to merge the unit definition with its position
> in the floor.

Congratulations! You've created your first tower. At this point, this tower is
fully playable, but it can use some refactoring.
