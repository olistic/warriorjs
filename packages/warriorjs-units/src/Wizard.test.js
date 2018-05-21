import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/geography';
// import { look, shoot } from '@warriorjs/abilities';

import Wizard from './Wizard';

jest.mock('@warriorjs/abilities');
// jest.mock('@warriorjs/abilities', () => ({
//   look: jest.fn(),
//   shoot: jest.fn(),
// }));

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
    // expect(shoot).toHaveBeenCalledWith({ power: 11, range: 3 });
  });

  test('has look ability with range 3', () => {
    expect(Wizard.abilities).toHaveProperty('look');
    // expect(look).toHaveBeenCalledWith({ range: 3 });
  });

  describe('playing turn', () => {
    let turn;
    let space;

    beforeEach(() => {
      space = { isUnit: () => false };
      turn = {
        shoot: jest.fn(),
        look: jest.fn(() => [space, space, space]),
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
      const anotherSpace = { isUnit: jest.fn() };
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
