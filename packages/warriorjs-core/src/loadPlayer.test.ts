import { expect, test, vi } from 'vitest';

import loadPlayer from './loadPlayer.js';

test('runs player code and returns playTurn function', () => {
  const playerCode = `
    class Player {
      playTurn(warrior) {
        warrior.walk();
      }
    }
  `;
  const warrior = { walk: vi.fn() };
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
  }).toThrow('Check your syntax and try again!');
  expect(() => {
    loadPlayer(playerCode);
  }).toThrow('SyntaxError: Unexpected end of input');
});

test('throws if Player class is not defined', () => {
  const playerCode = 'function playTurn() {}';
  expect(() => {
    loadPlayer(playerCode);
  }).toThrow('You must define a Player class!');
});

test('throws if playTurn method is not defined', () => {
  const playerCode = 'class Player {}';
  expect(() => {
    loadPlayer(playerCode);
  }).toThrow('Your Player class must define a playTurn method!');
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
  const warrior = {} as any;
  expect(() => {
    playTurn(warrior);
  }).toThrow('warrior.walk is not a function');
});
