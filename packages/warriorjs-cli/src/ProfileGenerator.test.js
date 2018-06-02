import fs from 'fs';

import ejs from 'ejs';
import mock from 'mock-fs';

import ProfileGenerator, {
  PLAYER_CODE_TEMPLATE_FILE_PATH,
  README_TEMPLATE_FILE_PATH,
} from './ProfileGenerator';
import getFloorMap from './utils/getFloorMap';
import getFloorMapKey from './utils/getFloorMapKey';

jest.mock('ejs');

describe('ProfileGenerator', () => {
  let profileGenerator;
  let profile;
  let level;

  beforeEach(() => {
    profile = {
      getPlayerCodeFilePath: () => '/path/to/profile/player-code',
      getReadmeFilePath: () => '/path/to/profile/readme',
    };
    level = {
      floor: {
        map: 'map',
      },
    };
    profileGenerator = new ProfileGenerator(profile, level);
  });

  test('has a profile', () => {
    expect(profileGenerator.profile).toBe(profile);
  });

  test('has a level', () => {
    expect(profileGenerator.level).toBe(level);
  });

  describe('when generating', () => {
    beforeEach(() => {
      profileGenerator.generateReadmeFile = jest.fn();
      profileGenerator.generatePlayerCodeFile = jest.fn();
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
  });

  test('generates readme file', () => {
    mock({
      [README_TEMPLATE_FILE_PATH]: 'template',
      '/path/to/profile': {},
    });
    ejs.render = jest.fn().mockReturnValue('readme');
    profileGenerator.generateReadmeFile();
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
