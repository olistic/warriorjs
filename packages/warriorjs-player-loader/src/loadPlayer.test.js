import loadPlayer from './loadPlayer';

test('runs player code and returns Player instance', async () => {
  const playerCode = `
    class Player {
      playTurn() {
        return 42;
      }
    }
  `;
  const player = loadPlayer(playerCode);
  expect(player.playTurn()).toBe(42);
});

test('throws if invalid syntax', async () => {
  const playerCode = `
    class Player {
      playTurn() {}
  `;
  expect(() => {
    loadPlayer(playerCode);
  }).toThrow(
    new Error(
      'Invalid Player code. Check your syntax and try again!\n\nPlayer.js:3\n      playTurn() {}\n                  ^\n\nSyntaxError: Unexpected end of input',
    ),
  );
});

test('throws if Player class is not defined', async () => {
  const playerCode = 'function playTurn() {}';
  await expect(() => {
    loadPlayer(playerCode);
  }).toThrow(new Error('Invalid Player code. You must define a Player class!'));
});

test('throws if playTurn method is not defined', async () => {
  const playerCode = 'class Player {}';
  await expect(() => {
    loadPlayer(playerCode);
  }).toThrow(
    new Error(
      'Invalid Player code. Your Player class must define a playTurn method!',
    ),
  );
});
