import loadPlayer from './loadPlayer';

test('runs player code and returns playTurn function', () => {
  const playerCode = `
    class Player {
      playTurn(warrior) {
        warrior.walk();
      }
    }
  `;
  const warrior = { walk: jest.fn() };
  const playTurn = loadPlayer(playerCode);
  playTurn(warrior);
  expect(warrior.walk).toHaveBeenCalled();
});

test('throws if invalid syntax', () => {
  const playerCode = `
    class Player {
      playTurn() {}
  `;
  expect(() => {
    loadPlayer(playerCode);
  }).toThrow(
    new Error(
      'Check your syntax and try again!\n\nPlayer.js:3\n      playTurn() {}\n                  ^\n\nSyntaxError: Unexpected end of input',
    ),
  );
});

test('throws if Player class is not defined', () => {
  const playerCode = 'function playTurn() {}';
  expect(() => {
    loadPlayer(playerCode);
  }).toThrow(new Error('You must define a Player class!'));
});

test('throws if playTurn method is not defined', () => {
  const playerCode = 'class Player {}';
  expect(() => {
    loadPlayer(playerCode);
  }).toThrow(new Error('Your Player class must define a playTurn method!'));
});

test("throws when playing turn if there's something wrong", () => {
  const playerCode = `
    class Player {
      playTurn(warrior) {
        warrior.walk();
      }
    }
  `;
  const playTurn = loadPlayer(playerCode);
  const warrior = {};
  expect(() => {
    playTurn(warrior);
  }).toThrow(new Error('warrior.walk is not a function'));
});
