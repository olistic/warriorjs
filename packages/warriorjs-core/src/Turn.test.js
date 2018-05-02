import Turn from './Turn';

describe('Turn', () => {
  let turn;

  beforeEach(() => {
    const abilities = new Map([
      [
        'feel',
        {
          perform: () => {},
        },
      ],
      [
        'walk',
        {
          action: true,
          perform: () => {},
        },
      ],
    ]);
    turn = new Turn(abilities);
  });

  test('defines a function for each ability passed to the constructor', () => {
    expect(turn.feel).toBeInstanceOf(Function);
    expect(turn.walk).toBeInstanceOf(Function);
  });

  describe('with actions', () => {
    test('has no action performed at first', () => {
      expect(turn.action).toBeNull();
    });

    test('can perform action and recall it', () => {
      turn.walk();
      expect(turn.action).toEqual(['walk', []]);
    });

    test('includes arguments passed to action', () => {
      turn.walk('forward');
      expect(turn.action).toEqual(['walk', ['forward']]);
    });

    test('can not call multiple actions per turn', () => {
      turn.walk();
      expect(() => {
        turn.walk();
      }).toThrow('Only one action can be performed per turn.');
    });
  });

  describe('with senses', () => {
    test('can call multiple senses per turn', () => {
      turn.feel();
      turn.feel();
    });
  });
});
