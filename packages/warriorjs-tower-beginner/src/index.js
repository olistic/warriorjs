import { EAST, WEST } from '@warriorjs/geography';
import {
  Archer,
  Captive,
  Sludge,
  ThickSludge,
  Warrior,
  Wizard,
} from '@warriorjs/units';
import {
  attack,
  feel,
  health,
  look,
  pivot,
  rescue,
  rest,
  think,
  shoot,
  walk,
} from '@warriorjs/abilities';

export default {
  name: 'beginner',
  levels: [
    {
      description:
        "You see before yourself a long hallway with stairs at the end. There's nothing in the way.",
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
            think: think(),
            walk: walk(),
          },
          position: {
            x: 0,
            y: 0,
            facing: EAST,
          },
        },
        units: [],
      },
    },
    {
      description:
        "It's too dark to see anything, but you smell sludge nearby.",
      tip:
        "Use `warrior.feel().isUnit()` to see if there's anything in front of you, and `warrior.attack()` to fight it. Remember, you can only do one action per turn.",
      clue:
        'Add an if/else condition using `warrior.feel().isUnit()` to decide whether to attack or walk.',
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
            attack: attack({ power: 5 }),
            feel: feel(),
          },
          position: {
            x: 0,
            y: 0,
            facing: EAST,
          },
        },
        units: [
          {
            ...Sludge,
            position: {
              x: 4,
              y: 0,
              facing: WEST,
            },
          },
        ],
      },
    },
    {
      description:
        'The air feels thicker than before. There must be a horde of sludge.',
      tip:
        'Be careful not to die! Use `warrior.health()` to keep an eye on your health, and `warrior.rest()` to earn 10% of your max health back.',
      clue:
        "When there's no enemy ahead of you, call `warrior.rest()` until your health is full before walking forward.",
      timeBonus: 35,
      aceScore: 71,
      floor: {
        size: {
          width: 9,
          height: 1,
        },
        stairs: {
          x: 8,
          y: 0,
        },
        warrior: {
          ...Warrior,
          abilities: {
            health: health(),
            rest: rest({ healthGain: 0.1 }),
          },
          position: {
            x: 0,
            y: 0,
            facing: EAST,
          },
        },
        units: [
          {
            ...Sludge,
            position: {
              x: 2,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Sludge,
            position: {
              x: 4,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Sludge,
            position: {
              x: 5,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Sludge,
            position: {
              x: 7,
              y: 0,
              facing: WEST,
            },
          },
        ],
      },
    },
    {
      description: 'You can hear bow strings being stretched.',
      tip:
        "No new abilities this time, but you must be careful not to rest while taking damage. Save a `health` variable and compare it on each turn to see if you're taking damage.",
      clue:
        "Set `this.health` to your current health at the end of `playTurn`. If this is greater than your current health next turn, then you know you're taking damage and shouldn't rest.",
      timeBonus: 45,
      aceScore: 90,
      floor: {
        size: {
          width: 7,
          height: 1,
        },
        stairs: {
          x: 6,
          y: 0,
        },
        warrior: {
          ...Warrior,
          position: {
            x: 0,
            y: 0,
            facing: EAST,
          },
        },
        units: [
          {
            ...ThickSludge,
            position: {
              x: 2,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Archer,
            position: {
              x: 3,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...ThickSludge,
            position: {
              x: 5,
              y: 0,
              facing: WEST,
            },
          },
        ],
      },
    },
    {
      description: 'You hear cries for help. Captives must need rescuing.',
      tip:
        "When you find a unit, use `!unit.isEnemy() && unit.isBound()` to see if he's a captive and `warrior.rescue()` to rescue him. Don't attack captives.",
      clue:
        "Don't forget to constantly check if you are being attacked. Rest until your health is full if you're not taking damage.",
      timeBonus: 45,
      aceScore: 123,
      floor: {
        size: {
          width: 7,
          height: 1,
        },
        stairs: {
          x: 6,
          y: 0,
        },
        warrior: {
          ...Warrior,
          abilities: {
            rescue: rescue(),
          },
          position: {
            x: 0,
            y: 0,
            facing: EAST,
          },
        },
        units: [
          {
            ...Captive,
            position: {
              x: 2,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Archer,
            position: {
              x: 3,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Archer,
            position: {
              x: 4,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...ThickSludge,
            position: {
              x: 5,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Captive,
            position: {
              x: 6,
              y: 0,
              facing: WEST,
            },
          },
        ],
      },
    },
    {
      description:
        'The wall behind you feels a bit further away in this room. And you hear more cries for help.',
      tip:
        "You can walk backward by passing `'backward'` as an argument to `walk()`. Same goes for `feel()`, `rescue()` and `attack()`. Archers have a limited attack distance.",
      clue:
        "Walk backward if you're taking damage from afar and don't have enough health to attack. You may also want to consider walking backward until you hit a wall. Use `warrior.feel().isWall()` to see if there's a wall.",
      timeBonus: 55,
      aceScore: 105,
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
          position: {
            x: 2,
            y: 0,
            facing: EAST,
          },
        },
        units: [
          {
            ...Captive,
            position: {
              x: 0,
              y: 0,
              facing: EAST,
            },
          },
          {
            ...ThickSludge,
            position: {
              x: 4,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Archer,
            position: {
              x: 6,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Archer,
            position: {
              x: 7,
              y: 0,
              facing: WEST,
            },
          },
        ],
      },
    },
    {
      description:
        'You feel a wall right in front of you and an opening behind you.',
      tip:
        "You're not as effective at attacking backward. Use `warrior.feel().isWall()` and `warrior.pivot()` to turn around.",
      timeBonus: 30,
      aceScore: 50,
      floor: {
        size: {
          width: 6,
          height: 1,
        },
        stairs: {
          x: 0,
          y: 0,
        },
        warrior: {
          ...Warrior,
          abilities: {
            pivot: pivot(),
          },
          position: {
            x: 5,
            y: 0,
            facing: EAST,
          },
        },
        units: [
          {
            ...Archer,
            position: {
              x: 1,
              y: 0,
              facing: EAST,
            },
          },
          {
            ...ThickSludge,
            position: {
              x: 3,
              y: 0,
              facing: EAST,
            },
          },
        ],
      },
    },
    {
      description:
        'You hear the mumbling of wizards. Beware of their deadly wands! Good thing you found a bow.',
      tip:
        'Use `warrior.look()` to determine your surroundings, and `warrior.shoot()` to fire an arrow.',
      clue:
        "Wizards are deadly but low in health. Kill them before they've time to attack.",
      timeBonus: 20,
      aceScore: 46,
      floor: {
        size: {
          width: 6,
          height: 1,
        },
        stairs: {
          x: 5,
          y: 0,
        },
        warrior: {
          ...Warrior,
          position: {
            x: 0,
            y: 0,
            facing: EAST,
          },
          abilities: {
            look: look({ range: 3 }),
            shoot: shoot({ power: 3, range: 3 }),
          },
        },
        units: [
          {
            ...Captive,
            position: {
              x: 2,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Wizard,
            position: {
              x: 3,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Wizard,
            position: {
              x: 4,
              y: 0,
              facing: WEST,
            },
          },
        ],
      },
    },
    {
      description:
        "Time to hone your skills and apply all of the abilities that you've learned.",
      tip: 'Watch your back.',
      clue:
        "Don't just keep shooting the bow while you're being attacked from behind.",
      timeBonus: 40,
      aceScore: 100,
      floor: {
        size: {
          width: 11,
          height: 1,
        },
        stairs: {
          x: 0,
          y: 0,
        },
        warrior: {
          ...Warrior,
          position: {
            x: 5,
            y: 0,
            facing: EAST,
          },
        },
        units: [
          {
            ...Captive,
            position: {
              x: 1,
              y: 0,
              facing: EAST,
            },
          },
          {
            ...Archer,
            position: {
              x: 2,
              y: 0,
              facing: EAST,
            },
          },
          {
            ...ThickSludge,
            position: {
              x: 7,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Wizard,
            position: {
              x: 9,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Captive,
            position: {
              x: 10,
              y: 0,
              facing: WEST,
            },
          },
        ],
      },
    },
  ],
};
