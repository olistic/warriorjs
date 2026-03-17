import {
  Attack,
  Feel,
  Health,
  Look,
  MaxHealth,
  Pivot,
  Rescue,
  Rest,
  Shoot,
  Think,
  Walk,
} from '@warriorjs/abilities';
import type { TowerDefinition } from '@warriorjs/core';
import { EAST, WEST } from '@warriorjs/spatial';
import { Archer, Captive, Sludge, ThickSludge, Wizard } from '@warriorjs/units';

const tower: TowerDefinition = {
  name: 'The Narrow Path',
  description: 'A corridor of stone where the only way out is forward',
  warrior: {
    character: '@',
    color: '#8fbcbb',
    maxHealth: 20,
  },
  levels: [
    {
      description:
        'A long hallway stretches before you, torchlight glinting off stairs at the far end. The air is still. Nothing stirs.',
      tip: "The path is clear. Call `warrior.walk()` to walk forward in the Player's `playTurn` method.",
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
          abilities: {
            think: Think,
            walk: Walk,
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
        'The torches have gone out. Darkness swallows the corridor, but the stench of sludge hangs thick in the air.',
      tip: "Something lurks ahead. Use `warrior.feel().isEmpty()` to check if the space is clear. If not, `warrior.attack()` will fight whatever's there. Remember: one action per turn.",
      clue: 'Add an if/else condition using `warrior.feel().isEmpty()` to decide whether to attack or walk.',
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
          abilities: {
            attack: Attack.with({ power: 5 }),
            feel: Feel,
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
        'The air is heavy and wet, almost hard to breathe. The stench is overwhelming — there must be a horde of them.',
      tip: 'These walls will wear you down. Use `warrior.health()` and `warrior.maxHealth()` to keep watch over your health, and `warrior.rest()` to recover 10% of your max health.',
      clue: "When there's no enemy ahead of you, call `warrior.rest()` until your health is full before walking forward.",
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
          abilities: {
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
              x: 2,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Sludge,
            position: {
              x: 4,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Sludge,
            position: {
              x: 5,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Sludge,
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
        'A faint creak echoes off the walls. Somewhere ahead, bow strings are being drawn.',
      tip: "No new abilities — but arrows fly whether you're ready or not. Save a `this.health` variable and compare it on each turn to see if you're taking damage. Don't rest under fire.",
      clue: "Set `this.health` to your current health at the end of `playTurn`. If this is greater than your current health next turn, then you know you're taking damage and shouldn't rest.",
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
          position: {
            x: 0,
            y: 0,
            facing: EAST,
          },
        },
        units: [
          {
            unit: ThickSludge,
            position: {
              x: 2,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Archer,
            position: {
              x: 3,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: ThickSludge,
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
      description: 'Muffled cries echo through the stone. Someone is alive down here — and bound.',
      tip: 'Not every figure in the dark is a foe. Use `warrior.feel().getUnit().isEnemy()` and `warrior.feel().getUnit().isBound()` to identify captives, and `warrior.rescue()` to free them.',
      clue: "Don't forget to constantly check if you are being attacked. Rest until your health is full if you're not taking damage.",
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
          abilities: {
            rescue: Rescue,
          },
          position: {
            x: 0,
            y: 0,
            facing: EAST,
          },
        },
        units: [
          {
            unit: Captive,
            position: {
              x: 2,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Archer,
            position: {
              x: 3,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Archer,
            position: {
              x: 4,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: ThickSludge,
            position: {
              x: 5,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Captive,
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
        'The corridor opens wider than before. Cries reach you from both ends — ahead and behind.',
      tip: "Danger on two fronts. Pass `'backward'` to `walk()`, `feel()`, `rescue()`, and `attack()` to act behind you. Archers have a limited attack distance.",
      clue: "Walk backward if you're taking damage from afar and don't have enough health to attack. You may also want to consider walking backward until you hit a wall. Use `warrior.feel().isWall()` to see if there's a wall.",
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
          position: {
            x: 2,
            y: 0,
            facing: EAST,
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
            unit: ThickSludge,
            position: {
              x: 4,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Archer,
            position: {
              x: 6,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Archer,
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
        'Cold stone meets your outstretched hand. A dead end — but a draft at your back tells you the way lies behind.',
      tip: "Fighting backward dulls your blade. Use `warrior.feel().isWall()` to detect the wall, and `warrior.pivot()` to turn and face what's coming.",
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
          abilities: {
            pivot: Pivot,
          },
          position: {
            x: 5,
            y: 0,
            facing: EAST,
          },
        },
        units: [
          {
            unit: Archer,
            position: {
              x: 1,
              y: 0,
              facing: EAST,
            },
          },
          {
            unit: ThickSludge,
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
        'Low chanting reverberates through the passage. Wizards. Your hand finds a bow left behind by some less fortunate soul.',
      tip: 'Their spells are deadly, but wizards are frail. Use `warrior.look()` to see ahead, and `warrior.shoot()` to loose an arrow before they strike.',
      clue: "Wizards are deadly but low in health. Kill them before they've time to attack.",
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
          abilities: {
            look: Look.with({ range: 3 }),
            shoot: Shoot.with({ power: 3, range: 3 }),
          },
          position: {
            x: 0,
            y: 0,
            facing: EAST,
          },
        },
        units: [
          {
            unit: Captive,
            position: {
              x: 2,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Wizard,
            position: {
              x: 3,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Wizard,
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
        "The passage splits open into a long chamber. Enemies ahead, enemies behind. Everything you've survived has led to this.",
      tip: 'Trust your instincts. Watch your back.',
      clue: "Don't just keep shooting the bow while you're being attacked from behind.",
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
          position: {
            x: 5,
            y: 0,
            facing: EAST,
          },
        },
        units: [
          {
            unit: Captive,
            position: {
              x: 1,
              y: 0,
              facing: EAST,
            },
          },
          {
            unit: Archer,
            position: {
              x: 2,
              y: 0,
              facing: EAST,
            },
          },
          {
            unit: ThickSludge,
            position: {
              x: 7,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Wizard,
            position: {
              x: 9,
              y: 0,
              facing: WEST,
            },
          },
          {
            unit: Captive,
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

export default tower;
