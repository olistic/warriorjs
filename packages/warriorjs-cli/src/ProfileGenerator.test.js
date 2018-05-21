import fs from 'fs';
import path from 'path';

import ejs from 'ejs';
import mock from 'mock-fs';

import ProfileGenerator from './ProfileGenerator';
import getFloorMap from './utils/getFloorMap';
import getFloorMapKey from './utils/getFloorMapKey';

jest.mock('ejs');
jest.mock('./utils/getFloorMap');
jest.mock('./utils/getFloorMapKey');

const templatesPath = path.resolve(__dirname, '..', 'templates');
const playerCodeTemplateFilePath = path.join(templatesPath, 'Player.js');
const readmeTemplateFilePath = path.join(templatesPath, 'README.md.ejs');

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

    test('generates readme file', async () => {
      await profileGenerator.generate();
      expect(profileGenerator.generateReadmeFile).toHaveBeenCalled();
      expect(profileGenerator.generatePlayerCodeFile).not.toHaveBeenCalled();
    });

    test('generates player code file if first level', async () => {
      profile.levelNumber = 1;
      await profileGenerator.generate();
      expect(profileGenerator.generatePlayerCodeFile).toHaveBeenCalled();
    });
  });

  test('generates readme file', async () => {
    mock({
      [readmeTemplateFilePath]: 'template',
      '/path/to/profile': {},
    });
    ejs.render = jest.fn().mockReturnValue('readme');
    getFloorMap.mockReturnValue('floorMap');
    getFloorMapKey.mockReturnValue('floorMapKey');
    await profileGenerator.generateReadmeFile();
    expect(ejs.render).toHaveBeenCalledWith('template', {
      profile,
      level,
      floorMap: 'floorMap',
      floorMapKey: 'floorMapKey',
    });
    expect(fs.readFileSync('/path/to/profile/readme', 'utf8')).toBe('readme');
    mock.restore();
  });

  test('generates player code file', async () => {
    mock({
      [playerCodeTemplateFilePath]: 'player-code',
      '/path/to/profile': {},
    });
    await profileGenerator.generatePlayerCodeFile();
    expect(fs.readFileSync('/path/to/profile/player-code', 'utf8')).toBe(
      'player-code',
    );
    mock.restore();
  });
});
