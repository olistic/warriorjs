import { describe, test, expect } from 'vitest';

import Warrior from './Warrior.js';

describe('Warrior', () => {
  test("appears as '@' on map", () => {
    expect(Warrior.character).toBe('@');
  });

  test('has #8fbcbb color', () => {
    expect(Warrior.color).toBe('#8fbcbb');
  });

  test('has 20 max health', () => {
    expect(Warrior.maxHealth).toBe(20);
  });
});
