import { beforeEach, describe, expect, test } from 'vitest';

import Archer from './Archer.js';
import RangedUnit from './RangedUnit.js';

describe('Archer', () => {
  let archer: Archer;

  beforeEach(() => {
    archer = new Archer();
  });

  test('extends RangedUnit', () => {
    expect(archer).toBeInstanceOf(RangedUnit);
  });

  test("appears as 'a' on map", () => {
    expect(archer.character).toBe('a');
  });

  test('has #ebcb8b color', () => {
    expect(archer.color).toBe('#ebcb8b');
  });

  test('has 7 max health', () => {
    expect(archer.maxHealth).toBe(7);
  });

  test('has shoot ability', () => {
    expect(Archer.declaredAbilities).toHaveProperty('shoot');
  });

  test('has look ability', () => {
    expect(Archer.declaredAbilities).toHaveProperty('look');
  });
});
