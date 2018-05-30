import fs from 'fs';
import path from 'path';

import cpFile from 'cp-file';
import ejs from 'ejs';

import getFloorMap from './utils/getFloorMap';
import getFloorMapKey from './utils/getFloorMapKey';

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
   * @param {Object} level The level.
   */
  constructor(profile, level) {
    this.profile = profile;
    this.level = level;
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
    const template = fs.readFileSync(README_TEMPLATE_FILE_PATH, 'utf8');
    const data = {
      profile: this.profile,
      level: this.level,
      floorMap: getFloorMap(this.level.floor.map),
      floorMapKey: getFloorMapKey(this.level.floor.map),
    };
    const renderedReadme = ejs.render(template, data);
    fs.writeFileSync(this.profile.getReadmeFilePath(), renderedReadme);
  }

  /**
   * Generates the player code file (Player.js).
   */
  generatePlayerCodeFile() {
    cpFile.sync(
      PLAYER_CODE_TEMPLATE_FILE_PATH,
      this.profile.getPlayerCodeFilePath(),
    );
  }
}

export default ProfileGenerator;
