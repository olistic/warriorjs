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
    const level = Object.assign(
      {},
      this._level,
      {
        number: this._profile.levelNumber,
        floorMap: this._getFloorMap(),
        warriorAbilities: {
          existent: this._profile.abilities,
          new: this._level.warrior.abilities,
        },
        units: this._getUniqueUnits(),
      },
    );
    return fs.readFileAsync(templatePath, 'utf8')
      .then((template) => Promise.resolve(ejs.render(template, { level })));
  }

  _getFloorMap() {
    const { width, height } = this._level.size;
    const stairsLocation = [this._level.stairs.x, this._level.stairs.y];
    const units = this._level.units
      .concat(Object.assign({}, this._level.warrior, { type: 'warrior' }))
      .map((unit) => ({
        type: unit.type,
        position: {
          x: unit.x,
          y: unit.y,
          facing: unit.facing,
        },
      }));
    return UI.getFloorCharacter(width, height, stairsLocation, units, false);
  }

  _getUniqueUnits() {
    const uniqueUnits = {};
    this._level.units.forEach((unit) => {
      if (!Object.keys(uniqueUnits).includes(unit.type)) {
        uniqueUnits[unit.type] = UI.getUnitCharacter(unit.type);
      }
    });
    const warriorName = this._profile.warriorName;
    uniqueUnits[warriorName] = UI.getUnitCharacter('warrior');
    return uniqueUnits;
  }
}
