import type { LevelConfig } from '@warriorjs/core';
import type Profile from '../Profile.js';

function renderPlayerCode(profile: Profile, _levelConfig: LevelConfig): string {
  if (profile.language === 'typescript') {
    return `import type { Warrior } from './types.js';

class Player {
  playTurn(warrior: Warrior) {
    // Cool code goes here.
  }
}
`;
  }

  return `class Player {
  playTurn(warrior) {
    // Cool code goes here.
  }
}
`;
}

export default renderPlayerCode;
