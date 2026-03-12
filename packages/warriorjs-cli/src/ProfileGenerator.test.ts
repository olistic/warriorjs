import fs from 'node:fs';
import mock from 'mock-fs';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import ProfileGenerator from './ProfileGenerator.js';
import renderPlayerCode from './utils/renderPlayerCode.js';
import renderReadme from './utils/renderReadme.js';
import renderTypes from './utils/renderTypes.js';

vi.mock('./utils/renderReadme.js');
vi.mock('./utils/renderPlayerCode.js');
vi.mock('./utils/renderTypes.js');

describe('ProfileGenerator', () => {
  let profileGenerator: ProfileGenerator;
  let profile: any;
  let levelConfig: any;

  beforeEach(() => {
    vi.clearAllMocks();
    profile = {
      getPlayerCodeFilePath: () => '/path/to/profile/player-code',
      getReadmeFilePath: () => '/path/to/profile/readme',
      directoryPath: '/path/to/profile',
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
    (renderReadme as any).mockReturnValue('rendered readme');
    mock({ '/path/to/profile': {} });
    profileGenerator.generateReadmeFile();
    expect(renderReadme).toHaveBeenCalledWith(profile, levelConfig);
    expect(fs.readFileSync('/path/to/profile/readme', 'utf8')).toBe('rendered readme');
    mock.restore();
  });

  test('generates player code file', () => {
    (renderPlayerCode as any).mockReturnValue('rendered player code');
    mock({ '/path/to/profile': {} });
    profileGenerator.generatePlayerCodeFile();
    expect(renderPlayerCode).toHaveBeenCalledWith(profile, levelConfig);
    expect(fs.readFileSync('/path/to/profile/player-code', 'utf8')).toBe('rendered player code');
    mock.restore();
  });

  test('generates types file', () => {
    (renderTypes as any).mockReturnValue('rendered types');
    mock({ '/path/to/profile': {} });
    profileGenerator.generateTypesFile();
    expect(renderTypes).toHaveBeenCalledWith(profile, levelConfig);
    expect(fs.readFileSync('/path/to/profile/types.ts', 'utf8')).toBe('rendered types');
    mock.restore();
  });
});
