import path from 'path';
import fs from 'fs-extra';
import ejs from 'ejs';
import Promise from 'bluebird';
import UI from './UI';

class PlayerGenerator {
  _profile;
  _level;

  constructor(profile, level) {
    this._profile = profile;
    this._level = level;
  }

  generate() {
    return Promise.join(this.generatePlayer(), this.generateReadme());
  }

  generatePlayer() {
    if (this._profile.getLevelNumber() === 1) {
      return fs.ensureDirAsync(this._profile.getPlayerPath())
        .then(() => fs.copyAsync(path.join(this.getTemplatesPath(), 'Player.js'), path.join(this._profile.getPlayerPath(), 'Player.js')));
    }

    return Promise.resolve();
  }

  generateReadme() {
    return this.readTemplate(path.join(this.getTemplatesPath(), 'README.ejs'))
      .then((renderedReadme) => fs.writeFileAsync(path.join(this._profile.getPlayerPath(), 'README'), renderedReadme));
  }

  getTemplatesPath() {
    return path.resolve(__dirname, '..', 'templates');
  }

  readTemplate(templatePath) {
    return fs.readFileAsync(templatePath, 'utf8')
      .then((template) => Promise.resolve(ejs.render(template, {
        levelNumber: this._profile.getLevelNumber(),
        level: this._level,
        levelFloor: this.getLevelFloor(),
        levelUnits: this.getLevelUnits(),
      })));
  }

  // FIXME: Re-utilize methods from UI

  getLevelFloor() {
    const rows = [];
    rows.push(`╔${'═'.repeat(this._level.size.width)}╗`);
    for (let y = 0; y < this._level.size.height; y++) {
      let row = '║';
      for (let x = 0; x < this._level.size.width; x++) {
        const foundUnit = this._level.units.find((unit) => unit.x === x && unit.y === y); // eslint-disable-line no-loop-func
        if (foundUnit) {
          row += UI.getUnitCharacter(foundUnit.type);
        } else if (this._level.warrior.x === x && this._level.warrior.y === y) {
          row += UI.getUnitCharacter('warrior');
        } else if (this._level.stairs.x === x && this._level.stairs.y === y) {
          row += '>';
        } else {
          row += ' ';
        }
      }

      row += '║';
      rows.push(row);
    }

    rows.push(`╚${'═'.repeat(this._level.size.width)}╝`);
    return rows.join('\n');
  }

  getLevelUnits() {
    const levelUnits = {};
    this._level.units.forEach((unit) => {
      if (!Object.keys(levelUnits).includes(unit.type)) {
        levelUnits[unit.type] = UI.getUnitCharacter(unit.type);
      }
    });
    const warriorName = this._profile.getWarriorName();
    levelUnits[warriorName] = UI.getUnitCharacter('warrior');
    return levelUnits;
  }
}

export default PlayerGenerator;
