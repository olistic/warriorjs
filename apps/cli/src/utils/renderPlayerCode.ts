import type { LevelConfig } from '@warriorjs/core';
import type Profile from '../Profile.js';

function renderPlayerCode(profile: Profile, _levelConfig: LevelConfig): string {
  if (profile.language === 'typescript') {
    return `import type { Warrior } from './types.js';

class Player {
  playTurn(warrior: Warrior) {
    // Decide what your warrior should do.
  }
}
`;
  }

  return `class Player {
  playTurn(warrior) {
    // Decide what your warrior should do.
  }
}
`;
}

export default renderPlayerCode;
