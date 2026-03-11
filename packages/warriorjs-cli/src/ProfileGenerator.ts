import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getLevel, type LevelConfig } from '@warriorjs/core';
import ejs from 'ejs';
import type Profile from './Profile.js';
import getFloorMap from './utils/getFloorMap.js';
import getFloorMapKey from './utils/getFloorMapKey.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templatesPath = path.resolve(__dirname, '..', 'templates');
export const PLAYER_CODE_JS_TEMPLATE = path.join(templatesPath, 'Player.js');
export const PLAYER_CODE_TS_TEMPLATE = path.join(templatesPath, 'Player.ts');
export const README_TEMPLATE_FILE_PATH = path.join(templatesPath, 'README.md.ejs');

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
    const level = getLevel(this.levelConfig);
    const template = fs.readFileSync(README_TEMPLATE_FILE_PATH, 'utf8');
    const data = {
      getFloorMap,
      getFloorMapKey,
      profile: this.profile,
      level,
    };
    const options = { filename: README_TEMPLATE_FILE_PATH };
    const renderedReadme = ejs.render(template, data, options);
    fs.writeFileSync(this.profile.getReadmeFilePath(), renderedReadme);
  }

  generatePlayerCodeFile(): void {
    const templatePath =
      this.profile.language === 'typescript' ? PLAYER_CODE_TS_TEMPLATE : PLAYER_CODE_JS_TEMPLATE;
    fs.copyFileSync(templatePath, this.profile.getPlayerCodeFilePath());
  }

  generateTypesFile(): void {
    const abilities = this.levelConfig.floor.warrior.abilities ?? {};

    const methods: string[] = [];
    let needsSpace = false;

    for (const [name, creator] of Object.entries(abilities)) {
      const ability = creator({} as any);
      if (!ability.meta) {
        continue;
      }

      const { meta } = ability;

      const params: string[] = meta.params.map((param: any) => {
        const tsType = param.type;
        if (tsType === 'Space') {
          needsSpace = true;
        }

        if (param.rest) {
          return `...${param.name}: ${tsType}[]`;
        }

        const optional = param.optional ? '?' : '';
        return `${param.name}${optional}: ${tsType}`;
      });

      const returnType = meta.returns;
      if (returnType === 'Space') {
        needsSpace = true;
      } else if (returnType === 'Space[]') {
        needsSpace = true;
      }

      methods.push(`  ${name}(${params.join(', ')}): ${returnType};`);
    }

    const lines: string[] = [];
    lines.push('// @generated');
    lines.push('');
    lines.push("export type Direction = 'forward' | 'right' | 'backward' | 'left';");

    if (needsSpace) {
      lines.push('');
      lines.push('export interface SensedUnit {');
      lines.push('  isBound(): boolean;');
      lines.push('  isEnemy(): boolean;');
      lines.push('  isUnderEffect(name: string): boolean;');
      lines.push('}');
      lines.push('');
      lines.push('export interface Space {');
      lines.push('  getLocation(): [number, number];');
      lines.push('  getUnit(): SensedUnit | null;');
      lines.push('  isEmpty(): boolean;');
      lines.push('  isStairs(): boolean;');
      lines.push('  isUnit(): boolean;');
      lines.push('  isWall(): boolean;');
      lines.push('}');
    }

    lines.push('');
    lines.push('export interface Warrior {');
    for (const method of methods) {
      lines.push(method);
    }
    lines.push('}');
    lines.push('');

    const typesFilePath = path.join(this.profile.directoryPath, 'types.ts');
    fs.writeFileSync(typesFilePath, lines.join('\n'));
  }
}

export default ProfileGenerator;
