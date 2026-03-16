import { Unit } from '@warriorjs/core';
import { beforeEach, describe, expect, test } from 'vitest';

import Captive from './Captive.js';

describe('Captive', () => {
  let captive: Captive;

  beforeEach(() => {
    captive = new Captive();
  });

  test('extends Unit', () => {
    expect(captive).toBeInstanceOf(Unit);
  });

  test("appears as 'C' on map", () => {
    expect(captive.character).toBe('C');
  });

  test('has #81a1c1 color', () => {
    expect(captive.color).toBe('#81a1c1');
  });

  test('has 1 max health', () => {
    expect(captive.maxHealth).toBe(1);
  });

  test('has a reward of 20 points', () => {
    expect(captive.reward).toBe(20);
  });

  test('is not an enemy', () => {
    expect(captive.enemy).toBe(false);
  });

  test('is bound', () => {
    expect(captive.bound).toBe(true);
  });
});
