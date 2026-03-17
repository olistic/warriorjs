import { describe, expect, test, vi } from 'vitest';
import type { AbilityMeta } from './Ability.js';
import Ability from './Ability.js';
import Action from './Action.js';
import Sense from './Sense.js';

class TestSense extends Sense {
  readonly description = 'test sense';
  readonly meta: AbilityMeta = { params: [], returns: 'number' };
  perform = vi.fn(() => 42);
}

describe('Sense', () => {
  test('extends Ability', () => {
    const sense = new TestSense({} as any);
    expect(sense).toBeInstanceOf(Ability);
    expect(sense).toBeInstanceOf(Sense);
  });

  test('is not an instance of Action', () => {
    const sense = new TestSense({} as any);
    expect(sense).not.toBeInstanceOf(Action);
  });

  test('has description and meta', () => {
    const sense = new TestSense({} as any);
    expect(sense.description).toBe('test sense');
    expect(sense.meta).toEqual({ params: [], returns: 'number' });
  });

  test('perform returns a value', () => {
    const sense = new TestSense({} as any);
    expect(sense.perform()).toBe(42);
  });
});
