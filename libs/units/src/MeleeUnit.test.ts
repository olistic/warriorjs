import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import MeleeUnit from './MeleeUnit.js';

class TestMeleeUnit extends MeleeUnit {
  constructor() {
    super('Melee', 'm', '#aaa', 10);
  }
}

describe('MeleeUnit', () => {
  let unit: TestMeleeUnit;
  let turn: any;
  let space: any;

  beforeEach(() => {
    unit = new TestMeleeUnit();
    space = { getUnit: () => undefined };
    turn = {
      attack: vi.fn(),
      feel: vi.fn(() => space),
    };
  });

  test('feels in all directions looking for threats', () => {
    unit.playTurn(turn);
    expect(turn.feel).toHaveBeenCalledWith(FORWARD);
    expect(turn.feel).toHaveBeenCalledWith(RIGHT);
    expect(turn.feel).toHaveBeenCalledWith(BACKWARD);
    expect(turn.feel).toHaveBeenCalledWith(LEFT);
  });

  test('attacks the first enemy it finds', () => {
    turn.feel.mockReturnValueOnce({
      getUnit: () => ({ isEnemy: () => true, isBound: () => false }),
    });
    unit.playTurn(turn);
    expect(turn.attack).toHaveBeenCalledWith(FORWARD);
  });

  test('does not attack if no enemies found', () => {
    unit.playTurn(turn);
    expect(turn.attack).not.toHaveBeenCalled();
  });

  test('does not attack bound enemies', () => {
    turn.feel.mockReturnValue({
      getUnit: () => ({ isEnemy: () => true, isBound: () => true }),
    });
    unit.playTurn(turn);
    expect(turn.attack).not.toHaveBeenCalled();
  });

  test('does not attack non-enemies', () => {
    turn.feel.mockReturnValue({
      getUnit: () => ({ isEnemy: () => false, isBound: () => false }),
    });
    unit.playTurn(turn);
    expect(turn.attack).not.toHaveBeenCalled();
  });

  test('stops looking once it finds a threat', () => {
    turn.feel.mockReturnValueOnce({ getUnit: () => undefined }).mockReturnValueOnce({
      getUnit: () => ({ isEnemy: () => true, isBound: () => false }),
    });
    unit.playTurn(turn);
    expect(turn.feel).toHaveBeenCalledTimes(2);
    expect(turn.attack).toHaveBeenCalledWith(RIGHT);
  });
});
