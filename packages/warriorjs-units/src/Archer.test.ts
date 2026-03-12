import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import Archer from './Archer.js';

vi.mock('@warriorjs/abilities');

describe('Archer', () => {
  test("appears as 'a' on map", () => {
    expect(Archer.character).toBe('a');
  });

  test('has #ebcb8b color', () => {
    expect(Archer.color).toBe('#ebcb8b');
  });

  test('has 7 max health', () => {
    expect(Archer.maxHealth).toBe(7);
  });

  test('has shoot ability with power 3 and range 3', () => {
    expect(Archer.abilities).toHaveProperty('shoot');
  });

  test('has look ability with range 3', () => {
    expect(Archer.abilities).toHaveProperty('look');
  });

  describe('playing turn', () => {
    let turn: any;
    let space: any;

    beforeEach(() => {
      space = { isUnit: () => false };
      turn = {
        shoot: vi.fn(),
        look: vi.fn(() => [space, space, space]),
      };
    });

    test('looks for player in all directions', () => {
      Archer.playTurn(turn);
      expect(turn.look).toHaveBeenCalledWith(FORWARD);
      expect(turn.look).toHaveBeenCalledWith(RIGHT);
      expect(turn.look).toHaveBeenCalledWith(BACKWARD);
      expect(turn.look).toHaveBeenCalledWith(LEFT);
    });

    test('stops looking in direction if it finds a space with a unit', () => {
      const anotherSpace = { isUnit: vi.fn() };
      turn.look.mockReturnValue([
        space,
        {
          isUnit: () => true,
          getUnit: () => ({ isEnemy: () => false }),
        },
        anotherSpace,
      ]);
      Archer.playTurn(turn);
      expect(anotherSpace.isUnit).not.toHaveBeenCalled();
    });

    test('stops looking if it finds threat', () => {
      turn.look.mockReturnValueOnce([space, space, space]).mockReturnValueOnce([
        space,
        {
          isUnit: () => true,
          getUnit: () => ({
            isBound: () => false,
            isEnemy: () => true,
          }),
        },
        space,
      ]);
      Archer.playTurn(turn);
      expect(turn.look).toHaveBeenCalledWith(FORWARD);
      expect(turn.look).toHaveBeenCalledWith(RIGHT);
      expect(turn.look).not.toHaveBeenCalledWith(BACKWARD);
      expect(turn.look).not.toHaveBeenCalledWith(LEFT);
      expect(turn.shoot).toHaveBeenCalledWith(RIGHT);
    });

    test("does nothing if it doesn't find threat", () => {
      turn.look.mockReturnValueOnce([
        space,
        space,
        {
          isUnit: () => true,
          getUnit: () => ({
            isBound: () => true,
            isEnemy: () => true,
          }),
        },
      ]);
      Archer.playTurn(turn);
      expect(turn.shoot).not.toHaveBeenCalled();
    });
  });
});
