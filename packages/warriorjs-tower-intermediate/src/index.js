import { EAST, NORTH, SOUTH, WEST } from '@warriorjs/geography';
import { Captive, Sludge, ThickSludge, Warrior } from '@warriorjs/units';
import {
  attack,
  bind,
  detonate,
  directionOf,
  directionOfStairs,
  distanceOf,
  feel,
  health,
  listen,
  look,
  rescue,
  rest,
  think,
  walk,
} from '@warriorjs/abilities';
import { ticking } from '@warriorjs/effects';

export default {
  name: 'intermediate',
  levels: [
    {
      description:
        'Silence. The room feels large, but empty. Luckily you have a map of this tower to help find the stairs.',
      tip:
        'Use `warrior.directionOfStairs()` to determine which direction the stairs are located. Pass this to `warrior.walk()` to walk in that direction.',
      timeBonus: 20,
      aceScore: 19,
      floor: {
        size: {
          width: 6,
          height: 4,
        },
        stairs: {
          x: 2,
          y: 3,
        },
        warrior: {
          ...Warrior,
          abilities: {
            directionOfStairs: directionOfStairs(),
            think: think(),
            walk: walk(),
          },
          position: {
            x: 0,
            y: 1,
            facing: EAST,
          },
        },
        units: [],
      },
    },
    {
      description:
        'Another large room, but with several enemies blocking your way to the stairs.',
      tip:
        'Just like walking, you can attack and feel in multiple directions (forward, left, right, backward).',
      clue:
        "Call `warrior.feel().isUnit()` and `unit.isEnemy()` in each direction to make sure there isn't an enemy beside you (attack if there is). Call `warrior.rest()` if you're low in health when there are no enemies around.",
      timeBonus: 40,
      aceScore: 84,
      floor: {
        size: {
          width: 4,
          height: 2,
        },
        stairs: {
          x: 3,
          y: 1,
        },
        warrior: {
          ...Warrior,
          abilities: {
            attack: attack({ power: 5 }),
            feel: feel(),
            rest: rest({ healthGain: 0.1 }),
            health: health(),
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
              x: 1,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...ThickSludge,
            position: {
              x: 2,
              y: 1,
              facing: WEST,
            },
          },
          {
            ...Sludge,
            position: {
              x: 1,
              y: 1,
              facing: NORTH,
            },
          },
        ],
      },
    },
    {
      description: 'You feel slime on all sides, you are surrounded!',
      tip: 'Call `warrior.bind()` to bind an enemy to keep him from attacking.',
      clue:
        'Count the number of unbound enemies around you. Bind an enemy if there are two or more.',
      timeBonus: 50,
      aceScore: 101,
      floor: {
        size: {
          width: 3,
          height: 3,
        },
        stairs: {
          x: 0,
          y: 0,
        },
        warrior: {
          ...Warrior,
          position: {
            x: 1,
            y: 1,
            facing: EAST,
          },
          abilities: {
            bind: bind(),
            rescue: rescue(),
          },
        },
        units: [
          {
            ...Sludge,
            position: {
              x: 1,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Captive,
            position: {
              x: 1,
              y: 2,
              facing: WEST,
            },
          },
          {
            ...Sludge,
            position: {
              x: 0,
              y: 1,
              facing: WEST,
            },
          },
          {
            ...Sludge,
            position: {
              x: 2,
              y: 1,
              facing: WEST,
            },
          },
        ],
      },
    },
    {
      description:
        'Your ears become more in tune with the surroundings. Listen to find enemies and captives!',
      tip:
        "Use `warrior.listen()` to find spaces with other units, and `warrior.directionOf()` to determine what direction they're in.",
      clue:
        'Walk towards a unit with `warrior.walk(warrior.directionOf(warrior.listen()[0]))`. Once `warrior.listen().length === 0`, head for the stairs.',
      timeBonus: 55,
      aceScore: 144,
      floor: {
        size: {
          width: 4,
          height: 3,
        },
        stairs: {
          x: 3,
          y: 2,
        },
        warrior: {
          ...Warrior,
          position: {
            x: 1,
            y: 1,
            facing: EAST,
          },
          abilities: {
            directionOf: directionOf(),
            listen: listen(),
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
            ...Captive,
            position: {
              x: 0,
              y: 2,
              facing: EAST,
            },
          },
          {
            ...Sludge,
            position: {
              x: 2,
              y: 0,
              facing: SOUTH,
            },
          },
          {
            ...ThickSludge,
            position: {
              x: 3,
              y: 1,
              facing: WEST,
            },
          },
          {
            ...Sludge,
            position: {
              x: 2,
              y: 2,
              facing: NORTH,
            },
          },
        ],
      },
    },
    {
      description:
        'You can feel the stairs right next to you, but are you sure you want to go up them right away?',
      tip:
        "You'll get more points for clearing the level first. Use `warrior.feel().isStairs()` and `warrior.feel().isEmpty()` to determine where to go.",
      clue:
        'If going towards a unit is the same direction as the stairs, try moving in another empty direction until you can safely move toward the enemies.',
      timeBonus: 45,
      aceScore: 107,
      floor: {
        size: {
          width: 5,
          height: 2,
        },
        stairs: {
          x: 1,
          y: 1,
        },
        warrior: {
          ...Warrior,
          position: {
            x: 0,
            y: 1,
            facing: EAST,
          },
        },
        units: [
          {
            ...ThickSludge,
            position: {
              x: 4,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...ThickSludge,
            position: {
              x: 3,
              y: 1,
              facing: NORTH,
            },
          },
          {
            ...Captive,
            position: {
              x: 4,
              y: 1,
              facing: WEST,
            },
          },
        ],
      },
    },
    {
      description:
        "What's that ticking? Some captives have a timed bomb at their feet!",
      tip:
        "Hurry and rescue captives that have `unit.isUnderEffect('ticking')` first, they'll soon go!",
      clue:
        "Avoid fighting enemies at first. Use `warrior.listen()` and `unit.isUnderEffect('ticking')` and quickly rescue those captives.",
      timeBonus: 50,
      aceScore: 108,
      floor: {
        size: {
          width: 6,
          height: 2,
        },
        stairs: {
          x: 5,
          y: 0,
        },
        warrior: {
          ...Warrior,
          position: {
            x: 0,
            y: 1,
            facing: EAST,
          },
        },
        units: [
          {
            ...Sludge,
            position: {
              x: 1,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Sludge,
            position: {
              x: 3,
              y: 1,
              facing: WEST,
            },
          },
          {
            ...Captive,
            position: {
              x: 0,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Captive,
            effects: {
              ticking: ticking({ time: 7 }),
            },
            position: {
              x: 4,
              y: 1,
              facing: WEST,
            },
          },
        ],
      },
    },
    {
      description:
        'Another ticking sound, but some sludge is blocking the way.',
      tip:
        "Quickly kill the sludge and rescue the captive before the bomb goes off. You can't simply go around them.",
      clue:
        'Determine the direction of the ticking captive and kill any enemies blocking that path. You may need to bind surrounding enemies first.',
      timeBonus: 70,
      aceScore: 134,
      floor: {
        size: {
          width: 5,
          height: 3,
        },
        stairs: {
          x: 4,
          y: 0,
        },
        warrior: {
          ...Warrior,
          position: {
            x: 0,
            y: 1,
            facing: EAST,
          },
        },
        units: [
          {
            ...Sludge,
            position: {
              x: 1,
              y: 0,
              facing: SOUTH,
            },
          },
          {
            ...Sludge,
            position: {
              x: 1,
              y: 2,
              facing: NORTH,
            },
          },
          {
            ...Captive,
            position: {
              x: 2,
              y: 1,
              facing: WEST,
            },
          },
          {
            ...Captive,
            effects: {
              ticking: ticking({ time: 10 }),
            },
            position: {
              x: 4,
              y: 1,
              facing: WEST,
            },
          },
          {
            ...Captive,
            position: {
              x: 2,
              y: 0,
              facing: WEST,
            },
          },
        ],
      },
    },
    {
      description:
        'You discover a satchel of bombs which will help when facing a mob of enemies.',
      tip:
        'Detonate a bomb when you see a couple enemies ahead of you (`warrior.look()`). Watch out for your health too.',
      clue:
        'Calling `warrior.look()` will return an array of spaces. If the first two contain enemies, detonate a bomb with `warrior.detonate()`.',
      timeBonus: 30,
      aceScore: 91,
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
          abilities: {
            detonate: detonate({ targetPower: 8, surroundingPower: 4 }),
            look: look({ range: 3 }),
          },
        },
        units: [
          {
            ...Captive,
            effects: {
              ticking: ticking({ time: 9 }),
            },
            position: {
              x: 5,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...ThickSludge,
            position: {
              x: 2,
              y: 0,
              facing: WEST,
            },
          },
          {
            ...Sludge,
            position: {
              x: 3,
              y: 0,
              facing: WEST,
            },
          },
        ],
      },
    },
    {
      description:
        'Never before have you seen a room so full of sludge. Start the fireworks!',
      tip:
        'Be careful not to let the ticking captive get caught in the flames. Use `warrior.distanceOf()` to avoid the captives.',
      clue:
        'Be sure to bind the surrounding enemies before fighting. Check your health before detonating explosives.',
      timeBonus: 70,
      aceScore: 176,
      floor: {
        size: {
          width: 4,
          height: 3,
        },
        stairs: {
          x: 3,
          y: 0,
        },
        warrior: {
          ...Warrior,
          position: {
            x: 0,
            y: 1,
            facing: EAST,
          },
          abilities: {
            distanceOf: distanceOf(),
          },
        },
        units: [
          {
            ...Captive,
            effects: {
              ticking: ticking({ time: 20 }),
            },
            position: {
              x: 2,
              y: 0,
              facing: SOUTH,
            },
          },
          {
            ...Captive,
            position: {
              x: 2,
              y: 2,
              facing: NORTH,
            },
          },
          {
            ...Sludge,
            position: {
              x: 0,
              y: 0,
              facing: SOUTH,
            },
          },
          {
            ...Sludge,
            position: {
              x: 1,
              y: 0,
              facing: SOUTH,
            },
          },
          {
            ...Sludge,
            position: {
              x: 1,
              y: 1,
              facing: EAST,
            },
          },
          {
            ...Sludge,
            position: {
              x: 2,
              y: 1,
              facing: EAST,
            },
          },
          {
            ...Sludge,
            position: {
              x: 3,
              y: 1,
              facing: EAST,
            },
          },
          {
            ...Sludge,
            position: {
              x: 0,
              y: 2,
              facing: NORTH,
            },
          },
          {
            ...Sludge,
            position: {
              x: 1,
              y: 2,
              facing: NORTH,
            },
          },
        ],
      },
    },
  ],
};
