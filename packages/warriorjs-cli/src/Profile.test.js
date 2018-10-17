import fs from 'fs';
import path from 'path';

import mock from 'mock-fs';

import GameError from './GameError';
import Profile from './Profile';

describe('Profile.load', () => {
  const originalRead = Profile.read;
  const originalIsProfileDirectory = Profile.isProfileDirectory;
  const profileTower = { id: 'foo', name: 'Foo' };
  const towers = [profileTower, { id: 'bar', name: 'Bar' }];

  afterEach(() => {
    Profile.read = originalRead;
    Profile.isProfileDirectory = originalIsProfileDirectory;
  });

  test('instances Profile with contents of profile file', () => {
    Profile.isProfileDirectory = () => true;
    Profile.read = () =>
      'eyJ3YXJyaW9yTmFtZSI6ICJKb2UiLCAidG93ZXJJZCI6ICJmb28iLCAiYW5vdGhlcktleSI6IDQyfQ==';
    const profile = Profile.load('/path/to/profile', towers);
    expect(profile).toBeInstanceOf(Profile);
    expect(profile.warriorName).toBe('Joe');
    expect(profile.tower).toBe(profileTower);
    expect(profile.anotherKey).toBe(42);
  });

  test('sets the directory path to the path from where the profile is being loaded', () => {
    Profile.isProfileDirectory = () => true;
    Profile.read = () =>
      'eyJ3YXJyaW9yTmFtZSI6ICJKb2UiLCAidG93ZXJJZCI6ICJmb28ifQ==';
    const profile = Profile.load('/path/to/profile', towers);
    expect(profile.directoryPath).toBe('/path/to/profile');
  });

  test('ignores keys that were once part of the encoded profile', () => {
    Profile.isProfileDirectory = () => true;
    Profile.read = () =>
      'eyJ3YXJyaW9yTmFtZSI6ICJKb2UiLCAidG93ZXJJZCI6ICJmb28iLCAiZGlyZWN0b3J5UGF0aCI6ICJsZWdhY3kiLCAidG93ZXJOYW1lIjogImxlZ2FjeSIsICJjdXJyZW50RXBpY1Njb3JlIjogImxlZ2FjeSIsICJjdXJyZW50RXBpY0dyYWRlcyI6ICJsZWdhY3kifQ==';
    const profile = Profile.load('/path/to/profile', towers);
    expect(profile).not.toHaveProperty('towerName');
    expect(profile.directoryPath).toBe('/path/to/profile');
    expect(profile.currentEpicScore).toBe(0);
    expect(profile.currentEpicGrades).toEqual({});
  });

  test('returns null if not a profile directory', () => {
    Profile.isProfileDirectory = () => false;
    const profile = Profile.load('/path/to/profile', towers);
    expect(profile).toBeNull();
  });

  test('returns null if no encoded profile', () => {
    Profile.isProfileDirectory = () => true;
    Profile.read = () => null;
    const profile = Profile.load('/path/to/profile', towers);
    expect(profile).toBeNull();
  });

  test('throws if profile tower is not available', () => {
    Profile.isProfileDirectory = () => true;
    Profile.read = () =>
      'eyJ3YXJyaW9yTmFtZSI6ICJKb2UiLCAidG93ZXJJZCI6ICJmb28iLCAiYW5vdGhlcktleSI6IDQyfQ==';
    expect(() => {
      Profile.load('/path/to/profile', []);
    }).toThrow(
      new GameError(`Unable to find tower 'foo', make sure it is available.`),
    );
  });
});

describe('Profile.isProfileDirectory', () => {
  test('returns false if only the profile file exists', () => {
    mock({ '/path/to/profile/.profile': 'encoded profile' });
    expect(Profile.isProfileDirectory('/path/to/profile')).toBe(false);
    mock.restore();
  });

  test('returns false if only the player code file exists', () => {
    mock({ '/path/to/profile/Player.js': 'player code' });
    expect(Profile.isProfileDirectory('/path/to/profile')).toBe(false);
    mock.restore();
  });

  test('returns false if neither file exists', () => {
    expect(Profile.isProfileDirectory('/path/to/profile')).toBe(false);
  });

  test('returns true if both files exist', () => {
    mock({
      '/path/to/profile/.profile': 'encoded profile',
      '/path/to/profile/Player.js': 'player code',
    });
    expect(Profile.isProfileDirectory('/path/to/profile')).toBe(true);
    mock.restore();
  });
});

describe('Profile.read', () => {
  test('returns contents of profile file', () => {
    mock({ '/path/to/profile/file': 'encoded profile' });
    expect(Profile.read('/path/to/profile/file')).toBe('encoded profile');
    mock.restore();
  });

  test("returns null if profile file doesn't exist", () => {
    mock({ '/path/to/profile': {} });
    expect(Profile.read('/path/to/profile/file')).toBeNull();
    mock.restore();
  });
});

describe('Profile.decode', () => {
  test('decodes from JSON + base64', () => {
    expect(
      Profile.decode(
        'eyJ3YXJyaW9yTmFtZSI6IkpvZSIsInRvd2VySWQiOiJmb28iLCJsZXZlbE51bWJlciI6MCwiY2x1ZSI6ZmFsc2UsImVwaWMiOmZhbHNlLCJzY29yZSI6MCwiZXBpY1Njb3JlIjowLCJhdmVyYWdlR3JhZGUiOm51bGx9',
      ),
    ).toEqual({
      warriorName: 'Joe',
      towerId: 'foo',
      levelNumber: 0,
      clue: false,
      epic: false,
      score: 0,
      epicScore: 0,
      averageGrade: null,
    });
  });

  test('throws if invalid encoded profile', () => {
    expect(() => {
      Profile.decode('invalid encoded profile');
    }).toThrow(
      new GameError(
        'Invalid .profile file. Try changing the directory under which you are running warriorjs.',
      ),
    );
  });
});

describe('Profile', () => {
  let profile;
  let tower;

  beforeEach(() => {
    tower = { id: 'foo', name: 'Foo' };
    profile = new Profile('Joe', tower, '/path/to/profile');
  });

  test('has a warrior name', () => {
    expect(profile.warriorName).toBe('Joe');
  });

  test('has a tower', () => {
    expect(profile.tower).toBe(tower);
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

  test('makes directory', () => {
    mock({ '/path/to': {} });
    profile.makeProfileDirectory();
    expect(fs.statSync('/path/to/profile').isDirectory()).toBe(true);
    mock.restore();
  });

  describe('when reading player code', () => {
    beforeEach(() => {
      profile.getPlayerCodeFilePath = () => '/path/to/profile/player-code';
    });

    test('returns contents of player code file', () => {
      mock({ '/path/to/profile/player-code': 'class Player {}' });
      expect(profile.readPlayerCode()).toBe('class Player {}');
      mock.restore();
    });

    test("returns null if player code file doesn't exist", () => {
      mock({ '/path/to/profile': {} });
      expect(profile.readPlayerCode()).toBeNull();
      mock.restore();
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

    test('increments the level number', () => {
      profile.levelNumber = 0;
      profile.goToNextLevel();
      expect(profile.levelNumber).toBe(1);
    });

    test('resets the clue status', () => {
      profile.clue = true;
      profile.goToNextLevel();
      expect(profile.clue).toBe(false);
    });

    test('saves the profile', () => {
      profile.goToNextLevel();
      expect(profile.save).toHaveBeenCalled();
    });
  });

  describe('when requesting the clue', () => {
    beforeEach(() => {
      profile.save = jest.fn();
    });

    test('sets the clue status', () => {
      profile.clue = false;
      profile.requestClue();
      expect(profile.clue).toBe(true);
    });

    test('saves the profile', () => {
      profile.requestClue();
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

    test('sets the epic status', () => {
      profile.epic = false;
      profile.enableEpicMode();
      expect(profile.epic).toBe(true);
    });

    test('saves the profile', () => {
      profile.enableEpicMode();
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

  test('writes the encoded profile to the profile file when saving', () => {
    profile.getProfileFilePath = () => '/path/to/profile/file';
    profile.encode = () => 'encoded';
    mock({ '/path/to/profile': {} });
    profile.save();
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
      'eyJ3YXJyaW9yTmFtZSI6IkpvZSIsInRvd2VySWQiOiJmb28iLCJsZXZlbE51bWJlciI6MCwiY2x1ZSI6ZmFsc2UsImVwaWMiOmZhbHNlLCJzY29yZSI6MCwiZXBpY1Njb3JlIjowLCJhdmVyYWdlR3JhZGUiOm51bGx9',
    );
  });

  test('serializes to JSON ignoring properties', () => {
    profile.currentEpicScore = 'ignored';
    profile.currentEpicGrades = 'ignored';
    profile.directoryPath = 'ignored';
    profile.tower = 'ignored';
    const serializedProfile = JSON.parse(JSON.stringify(profile));
    expect(serializedProfile).not.toHaveProperty('currentEpicScore');
    expect(serializedProfile).not.toHaveProperty('currentEpicGrades');
    expect(serializedProfile).not.toHaveProperty('directoryPath');
    expect(serializedProfile).not.toHaveProperty('tower');
  });

  test('has a nice string representation', () => {
    profile.tower.toString = () => 'Foo';
    profile.levelNumber = 4;
    profile.score = 123;
    expect(profile.toString()).toBe('Joe - Foo - level 4 - score 123');
  });

  describe('epic mode', () => {
    beforeEach(() => {
      profile.epic = true;
    });

    test('tallies the points by adding to the current epic score and grades', () => {
      profile.epicScore = 0;
      profile.currentEpicGrades = {};
      profile.tallyPoints(1, 124, 0.8);
      expect(profile.currentEpicScore).toBe(124);
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

      test('should override epic score and average grade with current ones if current epic score is higher', () => {
        profile.currentEpicScore = 123;
        profile.currentEpicGrades = { 1: 0.7, 2: 0.9 };
        profile.updateEpicScore();
        expect(profile.epicScore).toBe(123);
        expect(profile.averageGrade).toBe(0.8);
      });

      test('should not override epic score and average grade if it is lower', () => {
        profile.epicScore = 124;
        profile.averageGrade = 0.9;
        profile.currentEpicScore = 123;
        profile.currentEpicGrades = { 1: 0.7, 2: 0.9 };
        profile.updateEpicScore();
        expect(profile.epicScore).toBe(124);
        expect(profile.averageGrade).toBe(0.9);
      });

      test('saves the profile', () => {
        profile.updateEpicScore();
        expect(profile.save).toHaveBeenCalled();
      });
    });

    test('includes epic score in string representation', () => {
      profile.tower.toString = () => 'Foo';
      profile.score = 123;
      profile.getEpicScoreWithGrade = () => '124 (C)';
      expect(profile.toString()).toBe(
        'Joe - Foo - first score 123 - epic score 124 (C)',
      );
    });
  });
});
