---
id: refactoring
title: Refactoring
---

At this point, you should have the following code:

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

function feel(unit) {
  return {
    description:
      'Return the adjacent space in the given direction (forward by default).',
    perform(direction = 'forward') {
      return unit.getSensedSpaceAt(direction);
    },
  };
}

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

module.exports = {
  name: 'Game of Thrones',
  description:
    'There is only one war that matters: the Great War. And it is here.',
  levels: [Level1, Level2],
};
```

Just like what we did with the White Walker definition, we can extract the
common fields of the Warrior to an object and then use spread properties to add
it to every level:

```js
const Warrior = {
  character: '@',
  maxHealth: 20,
};

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
      ...Warrior,
      abilities: {
        walk: walk,
      },
      position: {
        x: 0,
        y: 0,
        facing: 'east',
      },
    },
  },
};

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
      ...Warrior,
      abilities: {
        attack: valyrianSteelSwordAttack,
        feel: feel,
      },
      position: {
        x: 0,
        y: 0,
        facing: 'east',
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

With regard to the abilities, we can see that both attack abilities are very
similar. Let's do something about that:

```js
function attackCreator({ power, weapon }) {
  return unit => ({
    action: true,
    description: `Attack a unit in the given direction (forward by default) with your ${weapon}, dealing ${power} HP of damage.`,
    perform(direction = 'forward') {
      const receiver = unit.getSpaceAt(direction).getUnit();
      if (receiver) {
        unit.log(`attacks ${direction} and hits ${receiver}`);
        unit.damage(receiver, power);
      } else {
        unit.log(`attacks ${direction} and hits nothing`);
      }
    },
  });
}

const valyrianSteelSwordAttack = attackCreator({
  power: 5,
  weapon: 'Valyrian steel sword',
});

const iceCrystalSwordAttack = attackCreator({
  power: 3,
  weapon: 'ice blade',
});
```

> We can call this the "ability creator" pattern, where we define a function
> (the ability creator) which returns another function (the ability) customized
> with the parameters we passed to the creator.

To end with the refactor, let's get rid of all those magic strings representing
directions. There's an official package called
[`@warriorjs/geography`](https://github.com/olistic/warriorjs/tree/master/packages/warriorjs-geography)
that exposes a bunch of constants and methods related to directioning. Let's use
it:

```js
const {
  EAST,
  FORWARD,
  RELATIVE_DIRECTIONS,
  WEST,
} = require('@warriorjs/geography');

function attackCreator({ power, weapon }) {
  return unit => ({
    action: true,
    description: `Attack a unit in the given direction (forward by default) with your ${weapon}, dealing ${power} HP of damage.`,
    perform(direction = FORWARD) {
      const receiver = unit.getSpaceAt(direction).getUnit();
      if (receiver) {
        unit.log(`attacks ${direction} and hits ${receiver}`);
        unit.damage(receiver, power);
      } else {
        unit.log(`attacks ${direction} and hits nothing`);
      }
    },
  });
}

const valyrianSteelSwordAttack = attackCreator({
  power: 5,
  weapon: 'Valyrian steel sword',
});

const iceCrystalSwordAttack = attackCreator({
  power: 3,
  weapon: 'ice blade',
});

function feel(unit) {
  return {
    description:
      'Return the adjacent space in the given direction (forward by default).',
    perform(direction = FORWARD) {
      return unit.getSensedSpaceAt(direction);
    },
  };
}

function walk(unit) {
  return {
    action: true,
    description: 'Move one space in the given direction (forward by default).',
    perform(direction = FORWARD) {
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

const Warrior = {
  character: '@',
  maxHealth: 20,
};

const WhiteWalker = {
  name: 'White Walker',
  character: 'w',
  maxHealth: 12,
  abilities: {
    attack: iceCrystalSwordAttack,
    feel: feel,
  },
  playTurn(whiteWalker) {
    const enemyDirection = RELATIVE_DIRECTIONS.find(direction => {
      const unit = whiteWalker.feel(direction).getUnit();
      return unit && unit.isEnemy();
    });
    if (enemyDirection) {
      whiteWalker.attack(enemyDirection);
    }
  },
};

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
      ...Warrior,
      abilities: {
        walk: walk,
      },
      position: {
        x: 0,
        y: 0,
        facing: EAST,
      },
    },
  },
};

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
      ...Warrior,
      abilities: {
        attack: valyrianSteelSwordAttack,
        feel: feel,
      },
      position: {
        x: 0,
        y: 0,
        facing: EAST,
      },
    },
    units: [
      {
        ...WhiteWalker,
        position: {
          x: 4,
          y: 0,
          facing: WEST,
        },
      },
    ],
  },
};

module.exports = {
  name: 'Game of Thrones',
  description:
    'There is only one war that matters: the Great War. And it is here.',
  levels: [Level1, Level2],
};
```

Much better! Keep reading to learn how to test and publish your tower so that
other players can play!
