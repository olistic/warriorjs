import fs from 'fs';
import path from 'path';

import ejs from 'ejs';
import mock from 'mock-fs';

import PlayerGenerator from './PlayerGenerator';
import getFloorMap from './utils/getFloorMap';
import getFloorMapKey from './utils/getFloorMapKey';

jest.mock('ejs');
jest.mock('./utils/getFloorMap');
jest.mock('./utils/getFloorMapKey');

const templatesPath = path.resolve(__dirname, '..', 'templates');
const playerCodeTemplateFilePath = path.join(templatesPath, 'Player.js');
const readmeTemplateFilePath = path.join(templatesPath, 'README.md.ejs');

describe('PlayerGenerator', () => {
  let playerGenerator;
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
    playerGenerator = new PlayerGenerator(profile, level);
  });

  test('has a profile', () => {
    expect(playerGenerator.profile).toBe(profile);
  });

  test('has a level', () => {
    expect(playerGenerator.level).toBe(level);
  });

  describe('when generating', () => {
    beforeEach(() => {
      playerGenerator.generateReadmeFile = jest.fn();
      playerGenerator.generatePlayerCodeFile = jest.fn();
    });

    test('generates readme file', async () => {
      await playerGenerator.generate();
      expect(playerGenerator.generateReadmeFile).toHaveBeenCalled();
      expect(playerGenerator.generatePlayerCodeFile).not.toHaveBeenCalled();
    });

    test('generates player code file if first level', async () => {
      profile.levelNumber = 1;
      await playerGenerator.generate();
      expect(playerGenerator.generatePlayerCodeFile).toHaveBeenCalled();
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
    await playerGenerator.generateReadmeFile();
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
    await playerGenerator.generatePlayerCodeFile();
    expect(fs.readFileSync('/path/to/profile/player-code', 'utf8')).toBe(
      'player-code',
    );
    mock.restore();
  });
});
