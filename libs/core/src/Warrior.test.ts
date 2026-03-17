import { beforeEach, describe, expect, test, vi } from 'vitest';
import Action from './Action.js';
import Sense from './Sense.js';

import Warrior from './Warrior.js';

class MockAction extends Action {
  readonly description: string;
  readonly meta = { params: [], returns: 'void' as const };
  constructor(unit: any, description: string) {
    super(unit);
    this.description = description;
  }
  perform = vi.fn();
}

class MockSense extends Sense {
  readonly description: string;
  readonly meta = { params: [], returns: 'void' as const };
  constructor(unit: any, description: string) {
    super(unit);
    this.description = description;
  }
  perform = vi.fn();
}

describe('Warrior', () => {
  let warrior: Warrior;

  beforeEach(() => {
    warrior = new Warrior('Joe', '@', '#8fbcbb', 20);
    warrior.addAbility('feel', new MockSense(warrior, 'a description'));
    warrior.addAbility('walk', new MockAction(warrior, 'a description'));
    warrior.log = vi.fn();
  });

  test('is upset for not doing anything when no action', () => {
    warrior.turn = { action: null };
    warrior.performTurn();
    expect(warrior.log).toHaveBeenCalledWith('does nothing');
  });

  test('is upset for not doing anything when bound', () => {
    warrior.bind();
    warrior.turn = { action: ['walk', []] };
    warrior.performTurn();
    expect(warrior.log).toHaveBeenCalledWith('does nothing');
  });

  test('is proud of earning points', () => {
    warrior.earnPoints(5);
    expect(warrior.log).toHaveBeenCalledWith('earns 5 points');
  });

  test('is upset for losing points', () => {
    warrior.losePoints(5);
    expect(warrior.log).toHaveBeenCalledWith('loses 5 points');
  });

  test('has a grouped collection of abilities', () => {
    expect(warrior.getAbilities()).toEqual({
      actions: [{ name: 'walk', description: 'a description' }],
      senses: [{ name: 'feel', description: 'a description' }],
    });
  });

  test('has a status', () => {
    expect(warrior.getStatus()).toEqual({
      health: 20,
      score: 0,
    });
  });
});
