import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import RangedUnit from './RangedUnit.js';

class TestRangedUnit extends RangedUnit {
  constructor() {
    super('Ranged', 'r', '#bbb', 8);
  }
}

describe('RangedUnit', () => {
  let unit: TestRangedUnit;
  let turn: any;
  let emptySpaces: any[];

  beforeEach(() => {
    unit = new TestRangedUnit();
    emptySpaces = [{ isUnit: () => false }, { isUnit: () => false }];
    turn = {
      shoot: vi.fn(),
      look: vi.fn(() => emptySpaces),
    };
  });

  test('looks in all directions for threats', () => {
    unit.playTurn(turn);
    expect(turn.look).toHaveBeenCalledWith(FORWARD);
    expect(turn.look).toHaveBeenCalledWith(RIGHT);
    expect(turn.look).toHaveBeenCalledWith(BACKWARD);
    expect(turn.look).toHaveBeenCalledWith(LEFT);
  });

  test('shoots the first direction with an enemy', () => {
    turn.look.mockReturnValueOnce([
      { isUnit: () => false },
      { isUnit: () => true, getUnit: () => ({ isEnemy: () => true, isBound: () => false }) },
    ]);
    unit.playTurn(turn);
    expect(turn.shoot).toHaveBeenCalledWith(FORWARD);
  });

  test('does not shoot if no enemies found', () => {
    unit.playTurn(turn);
    expect(turn.shoot).not.toHaveBeenCalled();
  });

  test('does not shoot bound enemies', () => {
    turn.look.mockReturnValue([
      { isUnit: () => true, getUnit: () => ({ isEnemy: () => true, isBound: () => true }) },
    ]);
    unit.playTurn(turn);
    expect(turn.shoot).not.toHaveBeenCalled();
  });

  test('does not shoot non-enemies', () => {
    turn.look.mockReturnValue([
      { isUnit: () => true, getUnit: () => ({ isEnemy: () => false, isBound: () => false }) },
    ]);
    unit.playTurn(turn);
    expect(turn.shoot).not.toHaveBeenCalled();
  });

  test('stops looking once it finds a threat', () => {
    turn.look
      .mockReturnValueOnce([{ isUnit: () => false }])
      .mockReturnValueOnce([
        { isUnit: () => true, getUnit: () => ({ isEnemy: () => true, isBound: () => false }) },
      ]);
    unit.playTurn(turn);
    expect(turn.look).toHaveBeenCalledTimes(2);
    expect(turn.shoot).toHaveBeenCalledWith(RIGHT);
  });
});
