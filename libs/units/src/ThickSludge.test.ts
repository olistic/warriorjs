import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import MeleeUnit from './MeleeUnit.js';
import ThickSludge from './ThickSludge.js';

describe('ThickSludge', () => {
  let thickSludge: ThickSludge;

  beforeEach(() => {
    thickSludge = new ThickSludge();
  });

  test('extends MeleeUnit', () => {
    expect(thickSludge).toBeInstanceOf(MeleeUnit);
  });

  test("appears as 'S' on map", () => {
    expect(thickSludge.character).toBe('S');
  });

  test('has #bf616a color', () => {
    expect(thickSludge.color).toBe('#bf616a');
  });

  test('has 24 max health', () => {
    expect(thickSludge.maxHealth).toBe(24);
  });

  test('has attack ability', () => {
    expect(thickSludge.declaredAbilities).toHaveProperty('attack');
  });

  test('has feel ability', () => {
    expect(thickSludge.declaredAbilities).toHaveProperty('feel');
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
      thickSludge.playTurn(turn);
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
      thickSludge.playTurn(turn);
      expect(turn.feel).toHaveBeenCalledWith(FORWARD);
      expect(turn.feel).toHaveBeenCalledWith(RIGHT);
      expect(turn.feel).not.toHaveBeenCalledWith(BACKWARD);
      expect(turn.feel).not.toHaveBeenCalledWith(LEFT);
      expect(turn.attack).toHaveBeenCalledWith(RIGHT);
    });

    test("does nothing if it doesn't find threat", () => {
      thickSludge.playTurn(turn);
      expect(turn.attack).not.toHaveBeenCalled();
    });
  });
});
