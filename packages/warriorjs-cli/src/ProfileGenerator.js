import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import cpFile from 'cp-file';
import ejs from 'ejs';

import getFloorMap from './utils/getFloorMap';
import getFloorMapKey from './utils/getFloorMapKey';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const templatesPath = path.resolve(__dirname, '..', 'templates');
const playerCodeTemplateFilePath = path.join(templatesPath, 'Player.js');
const readmeTemplateFilePath = path.join(templatesPath, 'README.md.ejs');

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
  async generate() {
    await this.generateReadmeFile();
    if (this.profile.levelNumber === 1) {
      await this.generatePlayerCodeFile();
    }
  }

  /**
   * Generates the README file (README.md).
   */
  async generateReadmeFile() {
    const template = await readFileAsync(readmeTemplateFilePath, 'utf8');
    const data = {
      profile: this.profile,
      level: this.level,
      floorMap: getFloorMap(this.level.floor.map),
      floorMapKey: getFloorMapKey(this.level.floor.map),
    };
    const renderedReadme = ejs.render(template, data);
    await writeFileAsync(this.profile.getReadmeFilePath(), renderedReadme);
  }

  /**
   * Generates the player code file (Player.js).
   */
  async generatePlayerCodeFile() {
    await cpFile(
      playerCodeTemplateFilePath,
      this.profile.getPlayerCodeFilePath(),
    );
  }
}

export default ProfileGenerator;
