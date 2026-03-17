import { describe, expect, test, vi } from 'vitest';
import type { AbilityMeta } from './Ability.js';
import Ability from './Ability.js';
import Action from './Action.js';
import Sense from './Sense.js';

class ConcreteAction extends Action {
  readonly description = 'test action';
  readonly meta: AbilityMeta = { params: [], returns: 'void' };
  perform = vi.fn();
}

class ConcreteSense extends Sense {
  readonly description = 'test sense';
  readonly meta: AbilityMeta = { params: [], returns: 'number' };
  perform = vi.fn(() => 42);
}

describe('Ability', () => {
  test('stores unit reference', () => {
    const unit = {} as any;
    const action = new ConcreteAction(unit);
    expect(action).toBeInstanceOf(Ability);
  });

  test('Action and Sense both extend Ability', () => {
    expect(new ConcreteAction({} as any)).toBeInstanceOf(Ability);
    expect(new ConcreteSense({} as any)).toBeInstanceOf(Ability);
  });
});
