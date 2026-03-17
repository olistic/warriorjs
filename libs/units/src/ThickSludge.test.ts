import { beforeEach, describe, expect, test } from 'vitest';

import MeleeUnit from './MeleeUnit.js';
import ThickSludge from './ThickSludge.js';

describe('ThickSludge', () => {
  let thickSludge: ThickSludge;

  beforeEach(() => {
    thickSludge = new ThickSludge();
  });

  test('extends MeleeUnit', () => {
    expect(thickSludge).toBeInstanceOf(MeleeUnit);
  });

  test("appears as 'S' on map", () => {
    expect(thickSludge.character).toBe('S');
  });

  test('has #bf616a color', () => {
    expect(thickSludge.color).toBe('#bf616a');
  });

  test('has 24 max health', () => {
    expect(thickSludge.maxHealth).toBe(24);
  });

  test('has attack ability', () => {
    expect(ThickSludge.declaredAbilities).toHaveProperty('attack');
  });

  test('has feel ability', () => {
    expect(ThickSludge.declaredAbilities).toHaveProperty('feel');
  });
});
