import { describe, expect, test } from 'vitest';

import renderPlayerCode from './renderPlayerCode.js';

describe('renderPlayerCode', () => {
  const levelConfig: any = {
    floor: { warrior: { abilities: {} } },
  };

  test('renders javascript player code', () => {
    const profile: any = { language: 'javascript' };
    expect(renderPlayerCode(profile, levelConfig)).toBe(
      `class Player {
  playTurn(warrior) {
    // Decide what your warrior should do.
  }
}
`,
    );
  });

  test('renders typescript player code', () => {
    const profile: any = { language: 'typescript' };
    expect(renderPlayerCode(profile, levelConfig)).toBe(
      `import type { Warrior } from './types.js';

class Player {
  playTurn(warrior: Warrior) {
    // Decide what your warrior should do.
  }
}
`,
    );
  });
});
