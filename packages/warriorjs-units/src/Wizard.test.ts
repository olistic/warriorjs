import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/geography';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import Wizard from './Wizard.js';

vi.mock('@warriorjs/abilities');

describe('Wizard', () => {
  test("appears as 'w' on map", () => {
    expect(Wizard.character).toBe('w');
  });

  test('has #b48ead color', () => {
    expect(Wizard.color).toBe('#b48ead');
  });

  test('has 3 max health', () => {
    expect(Wizard.maxHealth).toBe(3);
  });

  test('has shoot ability with power 11 and range 3', () => {
    expect(Wizard.abilities).toHaveProperty('shoot');
  });

  test('has look ability with range 3', () => {
    expect(Wizard.abilities).toHaveProperty('look');
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
      Wizard.playTurn(turn);
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
      Wizard.playTurn(turn);
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
      Wizard.playTurn(turn);
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
      Wizard.playTurn(turn);
      expect(turn.shoot).not.toHaveBeenCalled();
    });
  });
});
