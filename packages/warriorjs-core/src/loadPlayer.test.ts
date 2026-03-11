import { describe, expect, test, vi } from 'vitest';

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

describe('TypeScript support', () => {
  test('loads TypeScript player code', () => {
    const tsCode = `
      class Player {
        playTurn(warrior: any): void {}
      }
    `;
    const playTurn = loadPlayer(tsCode, 'typescript');
    expect(typeof playTurn).toBe('function');
  });

  test('executes TypeScript player code correctly', () => {
    const tsCode = `
      class Player {
        playTurn(warrior: any): void {
          warrior.walk();
        }
      }
    `;
    const warrior = { walk: vi.fn() };
    const playTurn = loadPlayer(tsCode, 'typescript');
    playTurn(warrior);
    expect(warrior.walk).toHaveBeenCalled();
  });

  test('strips type-only imports from TypeScript code', () => {
    const tsCode = `
      import type { Warrior } from './types.js';
      class Player {
        playTurn(warrior: Warrior): void {}
      }
    `;
    const playTurn = loadPlayer(tsCode, 'typescript');
    expect(typeof playTurn).toBe('function');
  });

  test('handles TypeScript interfaces and type annotations', () => {
    const tsCode = `
      interface Turn {
        walk(): void;
      }
      class Player {
        private count: number = 0;
        playTurn(warrior: Turn): void {
          this.count++;
        }
      }
    `;
    const playTurn = loadPlayer(tsCode, 'typescript');
    expect(typeof playTurn).toBe('function');
  });

  test('throws on invalid TypeScript syntax', () => {
    const badCode = `
      class Player {
        playTurn(warrior: ): void {}
      }
    `;
    expect(() => loadPlayer(badCode, 'typescript')).toThrow();
  });

  test('throws when Player class is not defined in TypeScript', () => {
    const code = `const x: number = 1;`;
    expect(() => loadPlayer(code, 'typescript')).toThrow('You must define a Player class!');
  });

  test('throws when playTurn method is missing in TypeScript', () => {
    const code = `class Player { name: string = 'test'; }`;
    expect(() => loadPlayer(code, 'typescript')).toThrow(
      'Your Player class must define a playTurn method!',
    );
  });
});
