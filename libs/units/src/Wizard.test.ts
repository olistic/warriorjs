import { beforeEach, describe, expect, test } from 'vitest';

import RangedUnit from './RangedUnit.js';
import Wizard from './Wizard.js';

describe('Wizard', () => {
  let wizard: Wizard;

  beforeEach(() => {
    wizard = new Wizard();
  });

  test('extends RangedUnit', () => {
    expect(wizard).toBeInstanceOf(RangedUnit);
  });

  test("appears as 'w' on map", () => {
    expect(wizard.character).toBe('w');
  });

  test('has #b48ead color', () => {
    expect(wizard.color).toBe('#b48ead');
  });

  test('has 3 max health', () => {
    expect(wizard.maxHealth).toBe(3);
  });

  test('has shoot ability', () => {
    expect(Wizard.declaredAbilities).toHaveProperty('shoot');
  });

  test('has look ability', () => {
    expect(Wizard.declaredAbilities).toHaveProperty('look');
  });
});
