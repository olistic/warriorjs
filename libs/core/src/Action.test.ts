import { describe, expect, test, vi } from 'vitest';
import type { AbilityMeta } from './Ability.js';
import Ability from './Ability.js';
import Action from './Action.js';
import Sense from './Sense.js';

class TestAction extends Action {
  readonly description = 'test action';
  readonly meta: AbilityMeta = { params: [], returns: 'void' };
  perform = vi.fn();

  static with(config: { power: number }) {
    return [TestAction, config] as const;
  }
}

describe('Action', () => {
  test('extends Ability', () => {
    const action = new TestAction({} as any);
    expect(action).toBeInstanceOf(Ability);
    expect(action).toBeInstanceOf(Action);
  });

  test('is not an instance of Sense', () => {
    const action = new TestAction({} as any);
    expect(action).not.toBeInstanceOf(Sense);
  });

  test('has description and meta', () => {
    const action = new TestAction({} as any);
    expect(action.description).toBe('test action');
    expect(action.meta).toEqual({ params: [], returns: 'void' });
  });

  test('perform can be called', () => {
    const action = new TestAction({} as any);
    action.perform();
    expect(action.perform).toHaveBeenCalled();
  });

  test('.with() returns an AbilityBinding', () => {
    const binding = TestAction.with({ power: 5 });
    expect(binding[0]).toBe(TestAction);
    expect(binding[1]).toEqual({ power: 5 });
  });
});
