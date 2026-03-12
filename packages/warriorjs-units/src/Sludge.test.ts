import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import Sludge from './Sludge.js';

vi.mock('@warriorjs/abilities');

describe('Sludge', () => {
  test("appears as 's' on map", () => {
    expect(Sludge.character).toBe('s');
  });

  test('has #d08770 color', () => {
    expect(Sludge.color).toBe('#d08770');
  });

  test('has 12 max health', () => {
    expect(Sludge.maxHealth).toBe(12);
  });

  test('has attack ability with power 3', () => {
    expect(Sludge.abilities).toHaveProperty('attack');
  });

  test('has feel ability', () => {
    expect(Sludge.abilities).toHaveProperty('feel');
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
      Sludge.playTurn(turn);
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
      Sludge.playTurn(turn);
      expect(turn.feel).toHaveBeenCalledWith(FORWARD);
      expect(turn.feel).toHaveBeenCalledWith(RIGHT);
      expect(turn.feel).not.toHaveBeenCalledWith(BACKWARD);
      expect(turn.feel).not.toHaveBeenCalledWith(LEFT);
      expect(turn.attack).toHaveBeenCalledWith(RIGHT);
    });

    test("does nothing if it doesn't find threat", () => {
      Sludge.playTurn(turn);
      expect(turn.attack).not.toHaveBeenCalled();
    });
  });
});
