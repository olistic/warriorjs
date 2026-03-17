import {
  Attack,
  Bind,
  Detonate,
  DirectionOf,
  DirectionOfStairs,
  DistanceOf,
  Feel,
  Health,
  Listen,
  Look,
  MaxHealth,
  Rescue,
  Rest,
  Think,
  Walk,
} from '@warriorjs/abilities';
import type { TowerDefinition } from '@warriorjs/core';
import { Ticking } from '@warriorjs/effects';
import { EAST, NORTH, SOUTH, WEST } from '@warriorjs/spatial';
import { Captive, Sludge, ThickSludge } from '@warriorjs/units';

const tower: TowerDefinition = {
  name: 'The Powder Keep',
  description: 'An old fortress where something ticks beneath the floor',
  warrior: {
    character: '@',
    color: '#8fbcbb',
    maxHealth: 20,
  },
  levels: [
    {
      description:
        'Silence. The room stretches wide and empty, your footsteps swallowed by the dark. A crumpled map in your hand marks the way to the stairs.',
      tip: "The dark won't guide you, but the map will. Use `warrior.directionOfStairs()` to find the stairs, and pass the result to `warrior.walk()` to move toward them.",
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
          abilities: {
            directionOfStairs: DirectionOfStairs,
            think: Think,
            walk: Walk,
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
        'The next chamber is not empty. Shapes shift in the darkness on all sides, between you and the stairs.',
      tip: 'Threats can come from any direction now. You can attack and feel forward, left, right, and backward.',
      clue: "Call `warrior.feel().isUnit()` and `warrior.feel().getUnit().isEnemy()` in each direction to make sure there isn't an enemy beside you (attack if there is). Call `warrior.rest()` if you're low in health when there are no enemies around.",
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
          abilities: {
            attack: Attack.with({ power: 5 }),
            feel: Feel,
            health: Health,
            maxHealth: MaxHealth,
            rest: Rest.with({ healthGain: 0.1 }),
          },
          position: {
            x: 0,
            y: 0,
            facing: EAST,
          },
        },
        units: [
          {
            unit: Sludge,
            position: {
              x: 1,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: ThickSludge,
            position: {
              x: 2,
              y: 1,
              facing: WEST,
            },
          },
          {
            unit: Sludge,
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
      description: 'Slime presses against you from every direction. You are surrounded.',
      tip: 'Too many to fight at once. Call `warrior.bind()` to hold an enemy in place while you deal with the others.',
      clue: 'Count the number of unbound enemies around you. Bind an enemy if there are two or more.',
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
          position: {
            x: 1,
            y: 1,
            facing: EAST,
          },
          abilities: {
            bind: Bind,
            rescue: Rescue,
          },
        },
        units: [
          {
            unit: Sludge,
            position: {
              x: 1,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Captive,
            position: {
              x: 1,
              y: 2,
              facing: WEST,
            },
          },
          {
            unit: Sludge,
            position: {
              x: 0,
              y: 1,
              facing: WEST,
            },
          },
          {
            unit: Sludge,
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
        'Your eyes are useless here, but your ears sharpen. Breathing. Struggling. Faint sounds scattered across the room.',
      tip: 'Listen for what you cannot see. Use `warrior.listen()` to find spaces with other units, and `warrior.directionOf()` to determine which way they are.',
      clue: 'Walk towards a unit with `warrior.walk(warrior.directionOf(warrior.listen()[0]))`. Once `warrior.listen().length === 0`, head for the stairs.',
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
          position: {
            x: 1,
            y: 1,
            facing: EAST,
          },
          abilities: {
            directionOf: DirectionOf,
            listen: Listen,
          },
        },
        units: [
          {
            unit: Captive,
            position: {
              x: 0,
              y: 0,
              facing: EAST,
            },
          },
          {
            unit: Captive,
            position: {
              x: 0,
              y: 2,
              facing: EAST,
            },
          },
          {
            unit: Sludge,
            position: {
              x: 2,
              y: 0,
              facing: SOUTH,
            },
          },
          {
            unit: ThickSludge,
            position: {
              x: 3,
              y: 1,
              facing: WEST,
            },
          },
          {
            unit: Sludge,
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
        'The stairs are right beside you — you could leave now. But the room beyond is not empty, and neither is your conscience.',
      tip: 'Leaving is easy. Clearing the floor is worth more. Use `warrior.feel().isStairs()` and `warrior.feel().isEmpty()` to choose your path.',
      clue: 'If going towards a unit is the same direction as the stairs, try moving in another empty direction until you can safely move toward the enemies.',
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
          position: {
            x: 0,
            y: 1,
            facing: EAST,
          },
        },
        units: [
          {
            unit: ThickSludge,
            position: {
              x: 4,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: ThickSludge,
            position: {
              x: 3,
              y: 1,
              facing: NORTH,
            },
          },
          {
            unit: Captive,
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
        'A rhythmic ticking cuts through the silence. Somewhere in the dark, a captive kneels over a bomb that will not wait.',
      tip: "Time is short. Rescue captives with `space.getUnit().isUnderEffect('ticking')` first — they won't last long.",
      clue: "Avoid fighting enemies at first. Use `warrior.listen()` and `space.getUnit().isUnderEffect('ticking')` and quickly rescue those captives.",
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
          position: {
            x: 0,
            y: 1,
            facing: EAST,
          },
        },
        units: [
          {
            unit: Sludge,
            position: {
              x: 1,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Sludge,
            position: {
              x: 3,
              y: 1,
              facing: WEST,
            },
          },
          {
            unit: Captive,
            position: {
              x: 0,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Captive,
            effects: {
              ticking: Ticking.with({ time: 7 }),
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
        'The ticking again. Faster now. But the sludge between you and the captive does not intend to move.',
      tip: 'No way around — only through. Kill the sludge and reach the captive before the bomb goes off.',
      clue: 'Determine the direction of the ticking captive and kill any enemies blocking that path. You may need to bind surrounding enemies first.',
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
          position: {
            x: 0,
            y: 1,
            facing: EAST,
          },
        },
        units: [
          {
            unit: Sludge,
            position: {
              x: 1,
              y: 0,
              facing: SOUTH,
            },
          },
          {
            unit: Sludge,
            position: {
              x: 1,
              y: 2,
              facing: NORTH,
            },
          },
          {
            unit: Captive,
            position: {
              x: 2,
              y: 1,
              facing: WEST,
            },
          },
          {
            unit: Captive,
            effects: {
              ticking: Ticking.with({ time: 10 }),
            },
            position: {
              x: 4,
              y: 1,
              facing: WEST,
            },
          },
          {
            unit: Captive,
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
        "Your boot catches a leather satchel half-buried in dust. Bombs. The keep's former garrison left something useful behind.",
      tip: 'Fire answers numbers. Use `warrior.look()` to spot clustered enemies, and `warrior.detonate()` to thin the herd. Mind your health.',
      clue: 'Calling `warrior.look()` will return an array of spaces. If the first two contain enemies, detonate a bomb with `warrior.detonate()`.',
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
          position: {
            x: 0,
            y: 0,
            facing: EAST,
          },
          abilities: {
            detonate: Detonate.with({ targetPower: 8, surroundingPower: 4 }),
            look: Look.with({ range: 3 }),
          },
        },
        units: [
          {
            unit: Captive,
            effects: {
              ticking: Ticking.with({ time: 9 }),
            },
            position: {
              x: 5,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: ThickSludge,
            position: {
              x: 2,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Sludge,
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
        'The final chamber writhes with sludge — more than you have ever seen. The ticking beneath the floor has not stopped.',
      tip: 'One wrong blast and the captive dies with the rest. Use `warrior.distanceOf()` to keep the flames clear of those you came to save.',
      clue: 'Be sure to bind the surrounding enemies before fighting. Check your health before detonating explosives.',
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
          position: {
            x: 0,
            y: 1,
            facing: EAST,
          },
          abilities: {
            distanceOf: DistanceOf,
          },
        },
        units: [
          {
            unit: Captive,
            effects: {
              ticking: Ticking.with({ time: 20 }),
            },
            position: {
              x: 2,
              y: 0,
              facing: SOUTH,
            },
          },
          {
            unit: Captive,
            position: {
              x: 2,
              y: 2,
              facing: NORTH,
            },
          },
          {
            unit: Sludge,
            position: {
              x: 0,
              y: 0,
              facing: SOUTH,
            },
          },
          {
            unit: Sludge,
            position: {
              x: 1,
              y: 0,
              facing: SOUTH,
            },
          },
          {
            unit: Sludge,
            position: {
              x: 1,
              y: 1,
              facing: EAST,
            },
          },
          {
            unit: Sludge,
            position: {
              x: 2,
              y: 1,
              facing: EAST,
            },
          },
          {
            unit: Sludge,
            position: {
              x: 3,
              y: 1,
              facing: EAST,
            },
          },
          {
            unit: Sludge,
            position: {
              x: 0,
              y: 2,
              facing: NORTH,
            },
          },
          {
            unit: Sludge,
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

export default tower;
