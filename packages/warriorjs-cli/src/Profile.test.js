import fs from 'fs';
import path from 'path';

import mock from 'mock-fs';

import GameError from './GameError';
import Profile from './Profile';

describe('Profile.load', () => {
  const originalRead = Profile.read;
  const originalIsProfileDirectory = Profile.isProfileDirectory;

  afterEach(() => {
    Profile.read = originalRead;
    Profile.isProfileDirectory = originalIsProfileDirectory;
  });

  test('instances Profile with contents of profile file', async () => {
    Profile.isProfileDirectory = () => true;
    Profile.read = () =>
      'eyJ3YXJyaW9yTmFtZSI6ICJKb2UiLCAidG93ZXJOYW1lIjogImJlZ2lubmVyIiwgImZvbyI6IDQyfQ==';
    const profile = await Profile.load('/path/to/profile');
    expect(profile).toBeInstanceOf(Profile);
    expect(profile.warriorName).toBe('Joe');
    expect(profile.towerName).toBe('beginner');
    expect(path.normalize(profile.directoryPath)).toBe(
      path.normalize('/path/to/profile'),
    );
    expect(profile.foo).toBe(42);
  });

  test('updates the path to the directory from where the profile is being loaded', async () => {
    Profile.isProfileDirectory = () => true;
    Profile.read = () =>
      'eyJ3YXJyaW9yTmFtZSI6ICJKb2UiLCAidG93ZXJOYW1lIjogImJlZ2lubmVyIiwgImRpcmVjdG9yeVBhdGgiOiAiL29sZC9wYXRoL3RvL3Byb2ZpbGUifQ==';
    const profile = await Profile.load('/new/path/to/profile');
    expect(profile.directoryPath).toBe('/new/path/to/profile');
  });

  test('returns null if not a profile directory', async () => {
    Profile.isProfileDirectory = () => false;
    const profile = await Profile.load('/path/to/profile');
    expect(profile).toBeNull();
  });

  test('returns null if no encoded profile', async () => {
    Profile.isProfileDirectory = () => true;
    Profile.read = () => null;
    const profile = await Profile.load('/path/to/profile');
    expect(profile).toBeNull();
  });
});

describe('Profile.isProfileDirectory', () => {
  test('returns false if only the profile file exists', async () => {
    mock({ '/path/to/profile/.profile': 'encoded profile' });
    const isProfileDirectory = await Profile.isProfileDirectory(
      '/path/to/profile',
    );
    mock.restore();
    expect(isProfileDirectory).toBe(false);
  });

  test('returns false if only the player code file exists', async () => {
    mock({ '/path/to/profile/Player.js': 'player code' });
    const isProfileDirectory = await Profile.isProfileDirectory(
      '/path/to/profile',
    );
    mock.restore();
    expect(isProfileDirectory).toBe(false);
  });

  test('returns false if neither file exists', async () => {
    const isProfileDirectory = await Profile.isProfileDirectory(
      '/path/to/profile',
    );
    expect(isProfileDirectory).toBe(false);
  });

  test('returns true if both files exist', async () => {
    mock({
      '/path/to/profile/.profile': 'encoded profile',
      '/path/to/profile/Player.js': 'player code',
    });
    const isProfileDirectory = await Profile.isProfileDirectory(
      '/path/to/profile',
    );
    mock.restore();
    expect(isProfileDirectory).toBe(true);
  });
});

describe('Profile.read', () => {
  test('returns contents of profile file', async () => {
    mock({ '/path/to/profile/file': 'encoded profile' });
    const encodedProfile = await Profile.read('/path/to/profile/file');
    mock.restore();
    expect(encodedProfile).toBe('encoded profile');
  });

  test("returns null if profile file doesn't exist", async () => {
    mock({ '/path/to/profile': {} });
    const encodedProfile = await Profile.read('/path/to/profile/file');
    mock.restore();
    expect(encodedProfile).toBeNull();
  });
});

describe('Profile.decode', () => {
  test('decodes from JSON + base64', () => {
    expect(Profile.decode('eyJmb28iOiA0Mn0=')).toEqual({ foo: 42 });
  });

  test('throws if invalid encoded profile', async () => {
    expect(() => {
      Profile.decode('invalid encoded profile');
    }).toThrow(GameError);
  });
});

describe('Profile', () => {
  let profile;

  beforeEach(() => {
    profile = new Profile('Joe', 'beginner', '/path/to/profile');
  });

  test('has a warrior name', () => {
    expect(profile.warriorName).toBe('Joe');
  });

  test('has a tower name', () => {
    expect(profile.towerName).toBe('beginner');
  });

  test('has a directory path', () => {
    expect(profile.directoryPath).toBe('/path/to/profile');
  });

  test('starts level number at zero', () => {
    expect(profile.levelNumber).toBe(0);
  });

  test('starts score at zero', () => {
    expect(profile.score).toBe(0);
    expect(profile.epicScore).toBe(0);
    expect(profile.currentEpicScore).toBe(0);
    expect(profile.currentEpicGrades).toEqual({});
  });

  test('starts in normal mode', () => {
    expect(profile.epic).toBe(false);
  });

  test("doesn't show clue at the beginning", () => {
    expect(profile.clue).toBe(false);
  });

  test('ensures directory', async () => {
    mock();
    await profile.ensureProfileDirectory();
    expect(fs.statSync('/path/to/profile').isDirectory()).toBe(true);
    mock.restore();
  });

  describe('when reading player code', () => {
    beforeEach(() => {
      profile.getPlayerCodeFilePath = () => '/path/to/profile/player-code';
    });

    test('returns contents of player code file', async () => {
      mock({ '/path/to/profile/player-code': 'class Player {}' });
      const playerCode = await profile.readPlayerCode();
      mock.restore();
      expect(playerCode).toBe('class Player {}');
    });

    test("returns null if player code file doesn't exist", async () => {
      mock({ '/path/to/profile': {} });
      const playerCode = await profile.readPlayerCode();
      mock.restore();
      expect(playerCode).toBeNull();
    });
  });

  test('knows the path to the player code file', () => {
    expect(profile.getPlayerCodeFilePath()).toBe(
      path.normalize('/path/to/profile/Player.js'),
    );
  });

  test('knows the path to the README file', () => {
    expect(profile.getReadmeFilePath()).toBe(
      path.normalize('/path/to/profile/README.md'),
    );
  });

  describe('when going to the next level', () => {
    beforeEach(() => {
      profile.save = jest.fn();
    });

    test('increments the level number', async () => {
      profile.levelNumber = 0;
      await profile.goToNextLevel();
      expect(profile.levelNumber).toBe(1);
    });

    test('resets the clue status', async () => {
      profile.clue = true;
      await profile.goToNextLevel();
      expect(profile.clue).toBe(false);
    });

    test('saves the profile', async () => {
      await profile.goToNextLevel();
      expect(profile.save).toHaveBeenCalled();
    });
  });

  describe('when requesting the clue', () => {
    beforeEach(() => {
      profile.save = jest.fn();
    });

    test('sets the clue status', async () => {
      profile.clue = false;
      await profile.requestClue();
      expect(profile.clue).toBe(true);
    });

    test('saves the profile', async () => {
      await profile.requestClue();
      expect(profile.save).toHaveBeenCalled();
    });
  });

  test('knows if clue is being shown', () => {
    expect(profile.isShowingClue()).toBe(false);
    profile.clue = true;
    expect(profile.isShowingClue()).toBe(true);
  });

  describe('enabling epic mode', () => {
    beforeEach(() => {
      profile.save = jest.fn();
    });

    test('sets the epic status', async () => {
      profile.epic = false;
      await profile.enableEpicMode();
      expect(profile.epic).toBe(true);
    });

    test('saves the profile', async () => {
      await profile.enableEpicMode();
      expect(profile.save).toHaveBeenCalled();
    });
  });

  test("knows if it's epic", () => {
    expect(profile.isEpic()).toBe(false);
    profile.epic = true;
    expect(profile.isEpic()).toBe(true);
  });

  test('tallies the points by adding to the score', () => {
    profile.score = 0;
    profile.tallyPoints(1, 123);
    expect(profile.score).toBe(123);
  });

  test('writes the encoded profile to the profile file when saving', async () => {
    profile.getProfileFilePath = () => '/path/to/profile/file';
    profile.encode = () => 'encoded';
    mock({ '/path/to/profile': {} });
    await profile.save();
    expect(fs.readFileSync('/path/to/profile/file', 'utf8')).toBe('encoded');
    mock.restore();
  });

  test('knows the path to the profile file', () => {
    expect(profile.getProfileFilePath()).toBe(
      path.normalize('/path/to/profile/.profile'),
    );
  });

  test('encodes with JSON + base64', () => {
    expect(profile.encode()).toBe(
      'eyJ3YXJyaW9yTmFtZSI6IkpvZSIsInRvd2VyTmFtZSI6ImJlZ2lubmVyIiwiZGlyZWN0b3J5UGF0aCI6Ii9wYXRoL3RvL3Byb2ZpbGUiLCJsZXZlbE51bWJlciI6MCwic2NvcmUiOjAsImNsdWUiOmZhbHNlLCJlcGljIjpmYWxzZSwiZXBpY1Njb3JlIjowLCJhdmVyYWdlR3JhZGUiOm51bGwsImN1cnJlbnRFcGljU2NvcmUiOjAsImN1cnJlbnRFcGljR3JhZGVzIjp7fX0=',
    );
  });

  test('has a nice string representation', () => {
    profile.levelNumber = 4;
    profile.score = 123;
    expect(profile.toString()).toBe('Joe - beginner - level 4 - score 123');
  });

  describe('epic mode', () => {
    beforeEach(() => {
      profile.epic = true;
    });

    test('tallies the points by adding to the current epic score', () => {
      profile.epicScore = 0;
      profile.tallyPoints(1, 124);
      expect(profile.currentEpicScore).toBe(124);
    });

    test('calculates the epic grade as a percentage of the ace score', () => {
      profile.tallyPoints(1, 80, 100);
      expect(profile.currentEpicGrades['1']).toBe(0.8);
    });

    test('calculates average grade as the average of the current epic grades', () => {
      profile.currentEpicGrades = { 1: 0.7, 2: 0.9 };
      expect(profile.calculateAverageGrade()).toBe(0.8);
    });

    test("doesn't calculate average grade if no grades are present", () => {
      expect(profile.calculateAverageGrade()).toBeNull();
    });

    test('returns only epic score if no average grade', () => {
      profile.epicScore = 124;
      expect(profile.getEpicScoreWithGrade()).toBe('124');
    });

    test('returns epic score with grade if average grade', () => {
      profile.epicScore = 124;
      profile.averageGrade = 0.7;
      expect(profile.getEpicScoreWithGrade()).toBe('124 (C)');
    });

    describe('updating epic score', () => {
      beforeEach(() => {
        profile.save = jest.fn();
      });

      test('should override epic score and average grade with current ones if current epic score is higher', async () => {
        profile.currentEpicScore = 123;
        profile.currentEpicGrades = { 1: 0.7, 2: 0.9 };
        await profile.updateEpicScore();
        expect(profile.epicScore).toBe(123);
        expect(profile.averageGrade).toBe(0.8);
      });

      test('should not override epic score and average grade if it is lower', async () => {
        profile.epicScore = 124;
        profile.averageGrade = 0.9;
        profile.currentEpicScore = 123;
        profile.currentEpicGrades = { 1: 0.7, 2: 0.9 };
        await profile.updateEpicScore();
        expect(profile.epicScore).toBe(124);
        expect(profile.averageGrade).toBe(0.9);
      });

      test('saves the profile', async () => {
        await profile.updateEpicScore();
        expect(profile.save).toHaveBeenCalled();
      });
    });

    test('includes epic score in string representation', () => {
      profile.score = 123;
      profile.getEpicScoreWithGrade = () => '124 (C)';
      expect(profile.toString()).toBe(
        'Joe - beginner - first score 123 - epic score 124 (C)',
      );
    });
  });
});
