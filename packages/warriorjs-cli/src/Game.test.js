import fs from 'fs';
import path from 'path';

import mock from 'mock-fs';
import { getLevel } from '@warriorjs/core';

import Game from './Game';
import GameError from './GameError';
import ProfileGenerator from './ProfileGenerator';
import Profile from './Profile';
import getLevelConfig from './utils/getLevelConfig';
import printLine from './ui/printLine';
import printSuccessLine from './ui/printSuccessLine';
import requestConfirmation from './ui/requestConfirmation';

jest.mock('@warriorjs/core');
jest.mock('./ProfileGenerator');
jest.mock('./utils/getLevelConfig');
jest.mock('./ui/printLine');
jest.mock('./ui/printSuccessLine');
jest.mock('./ui/requestConfirmation');

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game('/path/to/game');
  });

  test('has a run directory path', () => {
    expect(game.runDirectoryPath).toBe('/path/to/game');
  });

  test('has a game directory path', () => {
    expect(game.gameDirectoryPath).toBe(
      path.normalize('/path/to/game/warriorjs'),
    );
  });

  describe('when loading profile', () => {
    const originalLoad = Profile.load;

    beforeEach(() => {
      Profile.load = jest.fn();
      game.ensureGameDirectory = jest.fn();
      game.chooseProfile = jest.fn();
    });

    afterEach(() => {
      Profile.load = originalLoad;
    });

    test('returns profile if in profile directory', async () => {
      Profile.load.mockReturnValue('profile');
      const profile = await game.loadProfile();
      expect(profile).toBe('profile');
    });

    test('gives the option to choose a profile', async () => {
      Profile.load.mockReturnValue(null);
      game.chooseProfile.mockReturnValue('chosenProfile');
      const profile = await game.loadProfile();
      expect(profile).toBe('chosenProfile');
      expect(game.ensureGameDirectory).toHaveBeenCalled();
      expect(game.chooseProfile).toHaveBeenCalled();
    });
  });

  test('ensures game directory', async () => {
    game.makeGameDirectory = jest.fn();
    game.gameDirectoryExists = () => true;
    await game.ensureGameDirectory();
    expect(game.makeGameDirectory).not.toHaveBeenCalled();
    game.gameDirectoryExists = () => false;
    await game.ensureGameDirectory();
    expect(game.makeGameDirectory).toHaveBeenCalled();
  });

  test('knows if game directory exists', async () => {
    mock({ '/path/to/game': {} });
    await expect(game.gameDirectoryExists()).resolves.toBe(false);
    mock({ '/path/to/game/warriorjs': {} });
    await expect(game.gameDirectoryExists()).resolves.toBe(true);
    mock.restore();
  });

  describe('when making game directory', () => {
    test('requests confirmation from the player', async () => {
      requestConfirmation.mockResolvedValue(false);
      try {
        await game.makeGameDirectory();
      } catch (err) {} // eslint-disable-line no-empty
      expect(requestConfirmation).toHaveBeenCalledWith(
        'No warriorjs directory found, would you like to create one?',
        true,
      );
    });

    test('creates game directory if player confirms', async () => {
      requestConfirmation.mockResolvedValue(true);
      mock();
      await game.makeGameDirectory();
      expect(fs.statSync('/path/to/game/warriorjs').isDirectory()).toBe(true);
      mock.restore();
    });

    test('creates game directory if assume yes', async () => {
      game.assumeYes = true;
      mock();
      await game.makeGameDirectory();
      expect(requestConfirmation).not.toHaveBeenCalled();
      expect(fs.statSync('/path/to/game/warriorjs').isDirectory()).toBe(true);
      mock.restore();
    });

    test("throws if if player doesn't confirm", async () => {
      requestConfirmation.mockResolvedValue(false);
      await expect(game.makeGameDirectory()).rejects.toThrow(
        new GameError('Unable to continue without directory.'),
      );
    });

    test('throws if a warriorjs file exists', async () => {
      requestConfirmation.mockResolvedValue(true);
      mock({ '/path/to/game/warriorjs': '' });
      await expect(game.makeGameDirectory()).rejects.toThrow(
        new GameError(
          'A file named warriorjs exists at this location. Please change the directory under which you are running warriorjs.',
        ),
      );
      mock.restore();
    });
  });

  test('returns profiles', async () => {
    const originalLoad = Profile.load;
    game.getProfileDirectoriesPaths = () => [
      '/path/to/game/warriorjs/profile1',
      '/path/to/game/warriorjs/profile2',
    ];
    Profile.load = jest.fn();
    await game.getProfiles();
    expect(Profile.load).toHaveBeenCalledWith(
      '/path/to/game/warriorjs/profile1',
    );
    expect(Profile.load).toHaveBeenCalledWith(
      '/path/to/game/warriorjs/profile2',
    );
    Profile.load = originalLoad;
  });

  test('knows if profile exists', async () => {
    const nonExistingProfile = {
      directoryPath: '/path/to/nonexisting-profile',
    };
    const existentProfile = { directoryPath: '/path/to/profile' };
    game.getProfileDirectoriesPaths = () => ['/path/to/profile'];
    await expect(game.isExistingProfile(nonExistingProfile)).resolves.toBe(
      false,
    );
    await expect(game.isExistingProfile(existentProfile)).resolves.toBe(true);
  });

  test('returns paths to profile directories', async () => {
    mock({
      '/path/to/game/warriorjs': {
        profile1: {},
        profile2: {},
        'other-file': '',
      },
    });
    const profileDirectoriesPaths = await game.getProfileDirectoriesPaths();
    expect(profileDirectoriesPaths).toEqual([
      '/path/to/game/warriorjs/profile1',
      '/path/to/game/warriorjs/profile2',
    ]);
    mock.restore();
  });

  describe('when playing', () => {
    beforeEach(() => {
      game.playLevel = jest.fn();
    });

    describe('epic mode', () => {
      beforeEach(() => {
        game.profile = { updateEpicScore: jest.fn() };
      });

      test('plays level after level until level is failed or no more levels', async () => {
        game.playLevel
          .mockReturnValueOnce(true)
          .mockReturnValueOnce(true)
          .mockReturnValueOnce(false);
        await game.playEpicMode();
        expect(game.playLevel).toHaveBeenCalledTimes(3);
        expect(game.playLevel).toHaveBeenCalledWith(1);
        expect(game.playLevel).toHaveBeenCalledWith(2);
        expect(game.playLevel).toHaveBeenCalledWith(3);
        expect(game.profile.updateEpicScore).toHaveBeenCalled();
      });

      describe('with practice level', () => {
        beforeEach(() => {
          game.practiceLevel = 2;
        });

        test('plays only practice level', async () => {
          game.tower = { hasLevel: jest.fn().mockReturnValue(true) };
          await game.playEpicMode();
          expect(game.tower.hasLevel).toHaveBeenCalledWith(2);
          expect(game.playLevel).toHaveBeenCalledWith(2);
          expect(game.playLevel).toHaveBeenCalledTimes(1);
        });

        test("throws if tower doesn't have practice level", async () => {
          game.tower = { hasLevel: jest.fn().mockReturnValue(false) };
          await expect(game.playEpicMode()).rejects.toThrow(
            new GameError(
              'Unable to practice non-existent level, try another.',
            ),
          );
          expect(game.tower.hasLevel).toHaveBeenCalledWith(2);
        });
      });
    });

    describe('normal mode', () => {
      test('prepares first level if level number is zero', async () => {
        game.profile = {
          levelNumber: 0,
          getReadmeFilePath: () => '/path/to/profile/readme',
        };
        game.prepareNextLevel = jest.fn();
        await game.playNormalMode();
        expect(game.prepareNextLevel).toHaveBeenCalled();
        expect(printSuccessLine).toHaveBeenCalledWith(
          'First level has been generated. See /path/to/profile/readme for instructions.',
        );
        expect(game.playLevel).not.toHaveBeenCalled();
      });

      test('plays level if level number is greater than zero', async () => {
        game.profile = { levelNumber: 1 };
        await game.playNormalMode();
        expect(game.playLevel).toHaveBeenCalled();
      });

      test('throws if practice level', async () => {
        game.practiceLevel = 2;
        await expect(game.playNormalMode()).rejects.toThrow(
          new GameError(
            'Unable to practice level while not in epic mode, remove -l option.',
          ),
        );
      });
    });
  });

  describe('when requesting next level', () => {
    beforeEach(() => {
      game.profile = {
        levelNumber: 1,
        getReadmeFilePath: () => '/path/to/profile/readme',
      };
      game.prepareNextLevel = jest.fn();
      game.prepareEpicMode = jest.fn();
    });

    test('checks if tower has next level', async () => {
      game.tower = { hasLevel: jest.fn() };
      await game.requestNextLevel();
      expect(game.tower.hasLevel).toHaveBeenCalledWith(2);
    });

    describe('with next level', () => {
      beforeEach(() => {
        game.tower = { hasLevel: () => true };
      });

      test('requests confirmation from the player to continue on to next level', async () => {
        requestConfirmation.mockResolvedValue(false);
        await game.requestNextLevel();
        expect(requestConfirmation).toHaveBeenCalledWith(
          'Would you like to continue on to the next level?',
          true,
        );
      });

      test('prepares next level if player confirms', async () => {
        requestConfirmation.mockResolvedValue(true);
        await game.requestNextLevel();
        expect(game.prepareNextLevel).toHaveBeenCalled();
        expect(printSuccessLine).toHaveBeenCalledWith(
          'See /path/to/profile/readme for updated instructions.',
        );
      });

      test('prepares next level if assume yes', async () => {
        game.assumeYes = true;
        await game.requestNextLevel();
        expect(requestConfirmation).not.toHaveBeenCalled();
        expect(game.prepareNextLevel).toHaveBeenCalled();
        expect(printSuccessLine).toHaveBeenCalledWith(
          'See /path/to/profile/readme for updated instructions.',
        );
      });

      test("stays in current level if player doesn't confirm", async () => {
        requestConfirmation.mockResolvedValue(false);
        await game.requestNextLevel();
        expect(printLine).toHaveBeenCalledWith(
          'Staying on current level. Try to earn more points next time.',
        );
        expect(game.prepareNextLevel).not.toHaveBeenCalled();
        expect(game.prepareEpicMode).not.toHaveBeenCalled();
      });
    });

    describe('without next level', () => {
      beforeEach(() => {
        game.tower = { hasLevel: () => false };
      });

      test('requests confirmation from the player to continue to epic mode', async () => {
        requestConfirmation.mockResolvedValue(false);
        await game.requestNextLevel();
        expect(requestConfirmation).toHaveBeenCalledWith(
          'Would you like to continue on to epic mode?',
          true,
        );
      });

      test('prepares epic mode if player confirms', async () => {
        requestConfirmation.mockResolvedValue(true);
        await game.requestNextLevel();
        expect(game.prepareEpicMode).toHaveBeenCalled();
        expect(printSuccessLine).toHaveBeenCalledWith(
          'Run warriorjs again to play epic mode.',
        );
      });

      test('prepares epic mode if assume yes', async () => {
        game.assumeYes = true;
        await game.requestNextLevel();
        expect(requestConfirmation).not.toHaveBeenCalled();
        expect(game.prepareEpicMode).toHaveBeenCalled();
        expect(printSuccessLine).toHaveBeenCalledWith(
          'Run warriorjs again to play epic mode.',
        );
      });
    });
  });

  test('prepares next level', async () => {
    game.profile = { goToNextLevel: jest.fn() };
    game.generateProfileFiles = jest.fn();
    await game.prepareNextLevel();
    expect(game.profile.goToNextLevel).toHaveBeenCalled();
    expect(game.generateProfileFiles).toHaveBeenCalled();
  });

  test('generates player', async () => {
    game.profile = { levelNumber: 1 };
    game.tower = 'tower';
    getLevelConfig.mockReturnValue('config');
    getLevel.mockReturnValue('level');
    const mockGenerate = jest.fn();
    ProfileGenerator.mockImplementation(() => ({ generate: mockGenerate }));
    await game.generateProfileFiles();
    expect(getLevelConfig).toHaveBeenCalledWith(1, 'tower', game.profile);
    expect(getLevel).toHaveBeenCalledWith('config');
    expect(ProfileGenerator).toHaveBeenCalledWith(game.profile, 'level');
    expect(mockGenerate).toHaveBeenCalled();
  });

  test('prepares epic mode', async () => {
    game.profile = { enableEpicMode: jest.fn() };
    await game.prepareEpicMode();
    expect(game.profile.enableEpicMode).toHaveBeenCalled();
  });
});
