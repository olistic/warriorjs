import Warrior from './Warrior';

describe('Warrior', () => {
  let warrior;

  beforeEach(() => {
    warrior = new Warrior('Joe', '@', 20);
    warrior.log = jest.fn();
  });

  test('is upset for not doing anything when no action', () => {
    warrior.turn = { action: null };
    warrior.performTurn();
    expect(warrior.log).toHaveBeenCalledWith('does nothing');
  });

  test('is upset for not doing anything when bound', () => {
    warrior.bind();
    warrior.turn = { action: ['walk', []] };
    warrior.performTurn();
    expect(warrior.log).toHaveBeenCalledWith('does nothing');
  });

  test('is proud of earning points', () => {
    warrior.earnPoints(5);
    expect(warrior.log).toHaveBeenCalledWith('earns 5 points');
  });

  test('is upset for losing points', () => {
    warrior.losePoints(5);
    expect(warrior.log).toHaveBeenCalledWith('loses 5 points');
  });
});
