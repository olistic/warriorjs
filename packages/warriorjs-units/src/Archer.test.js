import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/geography';
// import { look, shoot } from '@warriorjs/abilities';

import Archer from './Archer';

jest.mock('@warriorjs/abilities');
// jest.mock('@warriorjs/abilities', () => ({
//   look: jest.fn(),
//   shoot: jest.fn(),
// }));

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
    // expect(shoot).toHaveBeenCalledWith({ power: 3, range: 3 });
  });

  test('has look ability with range 3', () => {
    expect(Archer.abilities).toHaveProperty('look');
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
      Archer.playTurn(turn);
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
