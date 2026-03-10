import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ejs from 'ejs';
import type Profile from './Profile.js';
import getFloorMap from './utils/getFloorMap.js';
import getFloorMapKey from './utils/getFloorMapKey.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templatesPath = path.resolve(__dirname, '..', 'templates');
export const PLAYER_CODE_TEMPLATE_FILE_PATH = path.join(templatesPath, 'Player.js');
export const README_TEMPLATE_FILE_PATH = path.join(templatesPath, 'README.md.ejs');

/** Class representing a profile generator. */
class ProfileGenerator {
  profile: Profile;
  level: unknown;

  constructor(profile: Profile, level: unknown) {
    this.profile = profile;
    this.level = level;
  }

  generate(): void {
    this.generateReadmeFile();
    if (this.profile.levelNumber === 1) {
      this.generatePlayerCodeFile();
    }
  }

  generateReadmeFile(): void {
    const template = fs.readFileSync(README_TEMPLATE_FILE_PATH, 'utf8');
    const data = {
      getFloorMap,
      getFloorMapKey,
      profile: this.profile,
      level: this.level,
    };
    const options = { filename: README_TEMPLATE_FILE_PATH };
    const renderedReadme = ejs.render(template, data, options);
    fs.writeFileSync(this.profile.getReadmeFilePath(), renderedReadme);
  }

  generatePlayerCodeFile(): void {
    fs.copyFileSync(PLAYER_CODE_TEMPLATE_FILE_PATH, this.profile.getPlayerCodeFilePath());
  }
}

export default ProfileGenerator;
