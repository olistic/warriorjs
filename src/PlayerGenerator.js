import path from 'path';
import fs from 'fs-extra';
import ejs from 'ejs';
import Promise from 'bluebird';
import UI from './UI';

const TEMPLATES_PATH = path.resolve(__dirname, '..', 'templates');

export default class PlayerGenerator {
  _profile;
  _level;

  constructor(profile, level) {
    this._profile = profile;
    this._level = level;
  }

  generate() {
    return Promise.join(this._generatePlayer(), this._generateReadme());
  }

  _generatePlayer() {
    if (this._profile.levelNumber === 1) {
      return fs.ensureDirAsync(this._profile.playerPath)
        .then(() => fs.copyAsync(path.join(TEMPLATES_PATH, 'Player.js'), path.join(this._profile.playerPath, 'Player.js')));
    }

    return Promise.resolve();
  }

  _generateReadme() {
    return this._readTemplate(path.join(TEMPLATES_PATH, 'README.ejs'))
      .then((renderedReadme) => fs.writeFileAsync(path.join(this._profile.playerPath, 'README'), renderedReadme));
  }

  _readTemplate(templatePath) {
    const warrior = this._level.floor.units[0];
    const level = Object.assign({}, this._level, {
      number: this._profile.levelNumber,
      floorMap: UI.getFloorCharacter(this._level.floor, false),
      units: this._getUniqueUnits(),
      warriorAbilities: {
        existent: this._profile.abilities,
        new: warrior.abilities,
      },
    });

    return fs.readFileAsync(templatePath, 'utf8')
      .then((template) => Promise.resolve(ejs.render(template, { level })));
  }

  _getUniqueUnits() {
    const warriorName = this._profile.warriorName;
    const uniqueUnits = {
      [warriorName]: UI.getUnitCharacter('warrior')
    };

    this._level.floor.units
      .slice(1)
      .forEach((unit) => {
        if (!(unit.type in uniqueUnits)) {
          uniqueUnits[unit.type] = UI.getUnitCharacter(unit.type);
        }
      });

    return uniqueUnits;
  }
}
