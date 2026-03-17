import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import MeleeUnit from './MeleeUnit.js';
import Sludge from './Sludge.js';

describe('Sludge', () => {
  let sludge: Sludge;

  beforeEach(() => {
    sludge = new Sludge();
  });

  test('extends MeleeUnit', () => {
    expect(sludge).toBeInstanceOf(MeleeUnit);
  });

  test("appears as 's' on map", () => {
    expect(sludge.character).toBe('s');
  });

  test('has #d08770 color', () => {
    expect(sludge.color).toBe('#d08770');
  });

  test('has 12 max health', () => {
    expect(sludge.maxHealth).toBe(12);
  });

  test('has attack ability', () => {
    expect(Sludge.declaredAbilities).toHaveProperty('attack');
  });

  test('has feel ability', () => {
    expect(Sludge.declaredAbilities).toHaveProperty('feel');
  });

  describe('playing turn', () => {
    let turn: any;
    let space: any;

    beforeEach(() => {
      space = { getUnit: () => undefined };
      turn = {
        attack: vi.fn(),
        feel: vi.fn(() => space),
      };
    });

    test('looks for player in all directions', () => {
      sludge.playTurn(turn);
      expect(turn.feel).toHaveBeenCalledWith(FORWARD);
      expect(turn.feel).toHaveBeenCalledWith(RIGHT);
      expect(turn.feel).toHaveBeenCalledWith(BACKWARD);
      expect(turn.feel).toHaveBeenCalledWith(LEFT);
    });

    test('stops looking if it finds threat', () => {
      turn.feel.mockReturnValueOnce({ getUnit: () => undefined }).mockReturnValueOnce({
        getUnit: () => ({
          isBound: () => false,
          isEnemy: () => true,
        }),
      });
      sludge.playTurn(turn);
      expect(turn.feel).toHaveBeenCalledWith(FORWARD);
      expect(turn.feel).toHaveBeenCalledWith(RIGHT);
      expect(turn.feel).not.toHaveBeenCalledWith(BACKWARD);
      expect(turn.feel).not.toHaveBeenCalledWith(LEFT);
      expect(turn.attack).toHaveBeenCalledWith(RIGHT);
    });

    test("does nothing if it doesn't find threat", () => {
      sludge.playTurn(turn);
      expect(turn.attack).not.toHaveBeenCalled();
    });
  });
});
