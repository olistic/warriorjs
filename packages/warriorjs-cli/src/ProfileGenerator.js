import fs from 'fs';
import path from 'path';

import ejs from 'ejs';
import { getLevel } from '@warriorjs/core';

import getFloorMap from './utils/getFloorMap';
import getFloorMapKey from './utils/getFloorMapKey';
import getLevelConfig from './utils/getLevelConfig';

const templatesPath = path.resolve(__dirname, '..', 'templates');
export const PLAYER_CODE_TEMPLATE_FILE_PATH = path.join(
  templatesPath,
  'Player.js',
);
export const README_TEMPLATE_FILE_PATH = path.join(
  templatesPath,
  'README.md.ejs',
);

/** Class representing a profile generator. */
class ProfileGenerator {
  /**
   * Creates a profile generator.
   *
   * @param {Profile} profile The profile.
   */
  constructor(profile) {
    this.profile = profile;
  }

  /**
   * Generates the profile files (README and, if first level, player code).
   */
  generate() {
    this.generateReadmeFile();
    if (this.profile.levelNumber === 1) {
      this.generatePlayerCodeFile();
    }
  }

  /**
   * Generates the README file (README.md).
   */
  generateReadmeFile() {
    const levelConfig = getLevelConfig(this.profile.levelNumber, this.profile);
    const level = getLevel(levelConfig);
    const template = fs.readFileSync(README_TEMPLATE_FILE_PATH, 'utf8');
    const data = {
      getFloorMap,
      getFloorMapKey,
      level,
      profile: this.profile,
    };
    const options = { filename: README_TEMPLATE_FILE_PATH };
    const renderedReadme = ejs.render(template, data, options);
    fs.writeFileSync(this.profile.getReadmeFilePath(), renderedReadme);
  }

  /**
   * Generates the player code file (Player.js).
   */
  generatePlayerCodeFile() {
    fs.copyFileSync(
      PLAYER_CODE_TEMPLATE_FILE_PATH,
      this.profile.getPlayerCodeFilePath(),
    );
  }
}

export default ProfileGenerator;
