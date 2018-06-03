import fs from 'fs';

import ejs from 'ejs';
import mock from 'mock-fs';
import { getLevel } from '@warriorjs/core';

import ProfileGenerator, {
  PLAYER_CODE_TEMPLATE_FILE_PATH,
  README_TEMPLATE_FILE_PATH,
} from './ProfileGenerator';
import getFloorMap from './utils/getFloorMap';
import getFloorMapKey from './utils/getFloorMapKey';
import getLevelConfig from './utils/getLevelConfig';

jest.mock('@warriorjs/core');
jest.mock('ejs');
jest.mock('./utils/getLevelConfig');

describe('ProfileGenerator', () => {
  let profileGenerator;
  let profile;
  let level;

  beforeEach(() => {
    profile = {
      levelNumber: 1,
      getPlayerCodeFilePath: () => '/path/to/profile/player-code',
      getReadmeFilePath: () => '/path/to/profile/readme',
    };
    profileGenerator = new ProfileGenerator(profile, level);
  });

  test('has a profile', () => {
    expect(profileGenerator.profile).toBe(profile);
  });

  describe('when generating', () => {
    beforeEach(() => {
      profileGenerator.generateReadmeFile = jest.fn();
      profileGenerator.generatePlayerCodeFile = jest.fn();
    });

    test('generates readme and player code files', () => {
      profileGenerator.generate();
      expect(profileGenerator.generateReadmeFile).toHaveBeenCalled();
      expect(profileGenerator.generatePlayerCodeFile).toHaveBeenCalled();
    });

    test("doesn't generate player code file if not first level", () => {
      profile.levelNumber = 2;
      profileGenerator.generate();
      expect(profileGenerator.generateReadmeFile).toHaveBeenCalled();
      expect(profileGenerator.generatePlayerCodeFile).not.toHaveBeenCalled();
    });
  });

  test('generates readme file', () => {
    mock({
      [README_TEMPLATE_FILE_PATH]: 'template',
      '/path/to/profile': {},
    });
    getLevelConfig.mockReturnValue('levelConfig');
    getLevel.mockReturnValue('level');
    ejs.render = jest.fn().mockReturnValue('readme');
    profileGenerator.generateReadmeFile();
    expect(getLevelConfig).toHaveBeenCalledWith(1, profile);
    expect(getLevel).toHaveBeenCalledWith('levelConfig');
    expect(ejs.render).toHaveBeenCalledWith(
      'template',
      {
        profile,
        getFloorMap,
        getFloorMapKey,
        level: 'level',
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
      [PLAYER_CODE_TEMPLATE_FILE_PATH]: 'player-code',
      '/path/to/profile': {},
    });
    profileGenerator.generatePlayerCodeFile();
    expect(fs.readFileSync('/path/to/profile/player-code', 'utf8')).toBe(
      'player-code',
    );
    mock.restore();
  });
});
