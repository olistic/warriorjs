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
      space = { isEmpty: () => true };
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

    test('stops looking in direction if it finds non-empty space', () => {
      const anotherSpace = { isEmpty: jest.fn() };
      turn.look.mockReturnValue([
        space,
        { isEmpty: () => false, isPlayer: () => false },
        anotherSpace,
      ]);
      Wizard.playTurn(turn);
      expect(anotherSpace.isEmpty).not.toHaveBeenCalled();
    });

    test('stops looking if it finds player', () => {
      turn.look
        .mockReturnValueOnce([space, space, space])
        .mockReturnValueOnce([
          space,
          { isEmpty: () => false, isPlayer: () => true },
          space,
        ]);
      Wizard.playTurn(turn);
      expect(turn.look).toHaveBeenCalledWith(FORWARD);
      expect(turn.look).toHaveBeenCalledWith(RIGHT);
      expect(turn.look).not.toHaveBeenCalledWith(BACKWARD);
      expect(turn.look).not.toHaveBeenCalledWith(LEFT);
      expect(turn.shoot).toHaveBeenCalledWith(RIGHT);
    });

    test("does nothing if it doesn't find player", () => {
      turn.look.mockReturnValueOnce([
        space,
        space,
        { isEmpty: () => false, isPlayer: () => false },
      ]);
      Wizard.playTurn(turn);
      expect(turn.shoot).not.toHaveBeenCalled();
    });
  });
});
