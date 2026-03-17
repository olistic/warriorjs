import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import Archer from './Archer.js';
import RangedUnit from './RangedUnit.js';

describe('Archer', () => {
  let archer: Archer;

  beforeEach(() => {
    archer = new Archer();
  });

  test('extends RangedUnit', () => {
    expect(archer).toBeInstanceOf(RangedUnit);
  });

  test("appears as 'a' on map", () => {
    expect(archer.character).toBe('a');
  });

  test('has #ebcb8b color', () => {
    expect(archer.color).toBe('#ebcb8b');
  });

  test('has 7 max health', () => {
    expect(archer.maxHealth).toBe(7);
  });

  test('has shoot ability', () => {
    expect(Archer.declaredAbilities).toHaveProperty('shoot');
  });

  test('has look ability', () => {
    expect(Archer.declaredAbilities).toHaveProperty('look');
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
      archer.playTurn(turn);
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
      archer.playTurn(turn);
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
      archer.playTurn(turn);
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
      archer.playTurn(turn);
      expect(turn.shoot).not.toHaveBeenCalled();
    });
  });
});
