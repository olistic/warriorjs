import fs from 'node:fs';
import { getLevel } from '@warriorjs/core';
import ejs from 'ejs';
import mock from 'mock-fs';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import ProfileGenerator, {
  PLAYER_CODE_JS_TEMPLATE,
  README_TEMPLATE_FILE_PATH,
} from './ProfileGenerator.js';
import getFloorMap from './utils/getFloorMap.js';
import getFloorMapKey from './utils/getFloorMapKey.js';

vi.mock('ejs');
vi.mock('@warriorjs/core');

describe('ProfileGenerator', () => {
  let profileGenerator: ProfileGenerator;
  let profile: any;
  let levelConfig: any;

  beforeEach(() => {
    vi.clearAllMocks();
    profile = {
      getPlayerCodeFilePath: () => '/path/to/profile/player-code',
      getReadmeFilePath: () => '/path/to/profile/readme',
    };
    levelConfig = {
      floor: {
        warrior: { abilities: {} },
      },
    };
    profileGenerator = new ProfileGenerator(profile, levelConfig);
  });

  test('has a profile', () => {
    expect(profileGenerator.profile).toBe(profile);
  });

  test('has a level config', () => {
    expect(profileGenerator.levelConfig).toBe(levelConfig);
  });

  describe('when generating', () => {
    beforeEach(() => {
      profileGenerator.generateReadmeFile = vi.fn();
      profileGenerator.generatePlayerCodeFile = vi.fn();
    });

    test('generates readme file', () => {
      profileGenerator.generate();
      expect(profileGenerator.generateReadmeFile).toHaveBeenCalled();
      expect(profileGenerator.generatePlayerCodeFile).not.toHaveBeenCalled();
    });

    test('generates player code file if first level', () => {
      profile.levelNumber = 1;
      profileGenerator.generate();
      expect(profileGenerator.generatePlayerCodeFile).toHaveBeenCalled();
    });

    test('generates types file for typescript profiles', () => {
      profile.language = 'typescript';
      profileGenerator.generateTypesFile = vi.fn();
      profileGenerator.generate();
      expect(profileGenerator.generateTypesFile).toHaveBeenCalled();
    });

    test('does not generate types file for javascript profiles', () => {
      profile.language = 'javascript';
      profileGenerator.generateTypesFile = vi.fn();
      profileGenerator.generate();
      expect(profileGenerator.generateTypesFile).not.toHaveBeenCalled();
    });
  });

  test('generates readme file', () => {
    const level = { number: 1 };
    (getLevel as any).mockReturnValue(level);
    mock({
      [README_TEMPLATE_FILE_PATH]: 'template',
      '/path/to/profile': {},
    });
    (ejs.render as any) = vi.fn().mockReturnValue('readme');
    profileGenerator.generateReadmeFile();
    expect(getLevel).toHaveBeenCalledWith(levelConfig);
    expect(ejs.render).toHaveBeenCalledWith(
      'template',
      {
        profile,
        level,
        getFloorMap,
        getFloorMapKey,
      },
      {
        filename: README_TEMPLATE_FILE_PATH,
      },
    );
    expect(fs.readFileSync('/path/to/profile/readme', 'utf8')).toBe('readme');
    mock.restore();
  });

  test.skip('generates player code file', () => {
    mock({
      [PLAYER_CODE_JS_TEMPLATE]: 'player-code',
      '/path/to/profile': {},
    });
    profileGenerator.generatePlayerCodeFile();
    expect(fs.readFileSync('/path/to/profile/player-code', 'utf8')).toBe('player-code');
    mock.restore();
  });

  describe('generateTypesFile', () => {
    const mockAbilities = {
      walk: () => ({
        action: true,
        description: 'Walks forward',
        perform() {},
        meta: {
          params: [{ name: 'direction', type: 'Direction' as const, optional: true }],
          returns: 'void' as const,
        },
      }),
      feel: () => ({
        description: 'Feels the space ahead',
        perform() {},
        meta: {
          params: [{ name: 'direction', type: 'Direction' as const, optional: true }],
          returns: 'Space' as const,
        },
      }),
      health: () => ({
        description: 'Returns current health',
        perform() {},
        meta: {
          params: [] as any[],
          returns: 'number' as const,
        },
      }),
    };

    test('generates types.ts with Warrior interface from ability meta', () => {
      mock({ '/path/to/profile': {} });
      const tsProfile = {
        ...profile,
        language: 'typescript',
        directoryPath: '/path/to/profile',
      };
      const tsLevelConfig = {
        floor: {
          warrior: { abilities: { walk: mockAbilities.walk, health: mockAbilities.health } },
        },
      };
      const generator = new ProfileGenerator(tsProfile, tsLevelConfig);
      generator.generateTypesFile();

      const content = fs.readFileSync('/path/to/profile/types.ts', 'utf8');
      expect(content).toContain(
        "export type Direction = 'forward' | 'right' | 'backward' | 'left'",
      );
      expect(content).toContain('export interface Warrior {');
      expect(content).toContain('walk(direction?: Direction): void;');
      expect(content).toContain('health(): number;');
      mock.restore();
    });

    test('includes Space interface when abilities return Space', () => {
      mock({ '/path/to/profile': {} });
      const tsProfile = {
        ...profile,
        language: 'typescript',
        directoryPath: '/path/to/profile',
      };
      const tsLevelConfig = {
        floor: {
          warrior: { abilities: { walk: mockAbilities.walk, feel: mockAbilities.feel } },
        },
      };
      const generator = new ProfileGenerator(tsProfile, tsLevelConfig);
      generator.generateTypesFile();

      const content = fs.readFileSync('/path/to/profile/types.ts', 'utf8');
      expect(content).toContain('export interface Space {');
      expect(content).toContain('export interface SensedUnit {');
      expect(content).toContain('isEmpty(): boolean;');
      expect(content).toContain('isWall(): boolean;');
      expect(content).toContain('getUnit(): SensedUnit | null;');
      expect(content).toContain('feel(direction?: Direction): Space;');
      mock.restore();
    });

    test('omits Space interface when no abilities use Space', () => {
      mock({ '/path/to/profile': {} });
      const tsProfile = {
        ...profile,
        language: 'typescript',
        directoryPath: '/path/to/profile',
      };
      const tsLevelConfig = {
        floor: {
          warrior: { abilities: { walk: mockAbilities.walk, health: mockAbilities.health } },
        },
      };
      const generator = new ProfileGenerator(tsProfile, tsLevelConfig);
      generator.generateTypesFile();

      const content = fs.readFileSync('/path/to/profile/types.ts', 'utf8');
      expect(content).not.toContain('export interface Space {');
      expect(content).not.toContain('export interface SensedUnit {');
      mock.restore();
    });

    test('skips abilities without meta', () => {
      mock({ '/path/to/profile': {} });
      const tsProfile = {
        ...profile,
        language: 'typescript',
        directoryPath: '/path/to/profile',
      };
      const noMetaAbility = () => ({
        description: 'No meta',
        perform() {},
      });
      const tsLevelConfig = {
        floor: {
          warrior: { abilities: { walk: mockAbilities.walk, legacy: noMetaAbility } },
        },
      };
      const generator = new ProfileGenerator(tsProfile, tsLevelConfig);
      generator.generateTypesFile();

      const content = fs.readFileSync('/path/to/profile/types.ts', 'utf8');
      expect(content).toContain('walk(direction?: Direction): void;');
      expect(content).not.toContain('legacy');
      mock.restore();
    });
  });
});
