import { describe, expect, test, vi } from 'vitest';

import Effect from './Effect.js';

class TestEffect extends Effect {
  readonly description = 'test effect';
  passTurn = vi.fn();
  trigger = vi.fn();

  static with(config: { time: number }) {
    return [TestEffect, config] as const;
  }
}

describe('Effect', () => {
  test('stores unit reference', () => {
    const unit = { log: vi.fn() };
    const effect = new TestEffect(unit);
    expect(effect).toBeInstanceOf(Effect);
  });

  test('has description', () => {
    const effect = new TestEffect({});
    expect(effect.description).toBe('test effect');
  });

  test('passTurn can be called', () => {
    const effect = new TestEffect({});
    effect.passTurn();
    expect(effect.passTurn).toHaveBeenCalled();
  });

  test('trigger can be called', () => {
    const effect = new TestEffect({});
    effect.trigger();
    expect(effect.trigger).toHaveBeenCalled();
  });

  test('.with() returns an EffectBinding', () => {
    const binding = TestEffect.with({ time: 5 });
    expect(binding[0]).toBe(TestEffect);
    expect(binding[1]).toEqual({ time: 5 });
  });
});
