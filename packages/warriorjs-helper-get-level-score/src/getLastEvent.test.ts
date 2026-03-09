import { test, expect } from 'vitest';
import getLastEvent from './getLastEvent.js';

test('returns the last event of the play', () => {
  const events = [['turn1'], ['turn2'], ['event1', 'event2', 'event3']];
  expect(getLastEvent(events)).toBe('event3');
});
