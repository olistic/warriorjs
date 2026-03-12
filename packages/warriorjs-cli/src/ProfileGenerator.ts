import fs from 'node:fs';
import path from 'node:path';
import type { LevelConfig } from '@warriorjs/core';
import type Profile from './Profile.js';
import renderPlayerCode from './utils/renderPlayerCode.js';
import renderReadme from './utils/renderReadme.js';
import renderTypes from './utils/renderTypes.js';

/** Class representing a profile generator. */
class ProfileGenerator {
  profile: Profile;
  levelConfig: LevelConfig;

  constructor(profile: Profile, levelConfig: LevelConfig) {
    this.profile = profile;
    this.levelConfig = levelConfig;
  }

  generate(): void {
    this.generateReadmeFile();
    if (this.profile.levelNumber === 1) {
      this.generatePlayerCodeFile();
    }
    if (this.profile.language === 'typescript') {
      this.generateTypesFile();
    }
  }

  generateReadmeFile(): void {
    const readme = renderReadme(this.profile, this.levelConfig);
    fs.writeFileSync(this.profile.getReadmeFilePath(), readme);
  }

  generatePlayerCodeFile(): void {
    const code = renderPlayerCode(this.profile, this.levelConfig);
    fs.writeFileSync(this.profile.getPlayerCodeFilePath(), code);
  }

  generateTypesFile(): void {
    const rendered = renderTypes(this.profile, this.levelConfig);
    const typesFilePath = path.join(this.profile.directoryPath, 'types.ts');
    fs.writeFileSync(typesFilePath, rendered);
  }
}

export default ProfileGenerator;
