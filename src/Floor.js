import chalk from 'chalk';
import Position from './Position';
import Space from './Space';
import Warrior from './units/Warrior';

class Floor {
  constructor() {
    this._width = 0;
    this._height = 0;
    this._units = [];
    this._stairsLocation = [-1, -1];
  }

  getWidth() {
    return this._width;
  }

  setWidth(width) {
    this._width = width;
  }

  getHeight() {
    return this._height;
  }

  setHeight(height) {
    this._height = height;
  }

  getStairsLocation() {
    return this._stairsLocation;
  }

  getUnits() {
    return this._units.filter((unit) => unit.getPosition() !== null);
  }

  getOtherUnits() {
    return this.getUnits().filter((unit) => !(unit instanceof Warrior));
  }

  getUniqueUnits() {
    const uniqueUnits = [];
    this.getUnits().forEach((unit) => {
      if (!uniqueUnits.map((u) => u.constructor).includes(unit.constructor)) {
        uniqueUnits.push(unit);
      }
    });
    return uniqueUnits;
  }

  addUnit(unit, x, y, direction) {
    this._units.push(unit);
    unit.setPosition(new Position(this, x, y, direction));
  }

  getStairsSpace() {
    return this.getSpace(...this.getStairsLocation());
  }

  placeStairs(x, y) {
    this._stairsLocation = [x, y];
  }

  getUnit(x, y) {
    return this.getUnits().find((unit) => unit.getPosition().isAt(x, y));
  }

  getSpace(x, y) {
    return new Space(this, x, y);
  }

  isOutOfBounds(x, y) {
    return x < 0 || y < 0 || x > this._width - 1 || y > this._height - 1;
  }

  getCharacter() {
    const rows = [];
    rows.push(` ${'-'.repeat(this._width)}`);
    for (let y = 0; y < this._height; y++) {
      let row = '|';
      for (let x = 0; x < this._width; x++) {
        row += this.getSpace(x, y).getCharacter();
      }
      row += '|';
      rows.push(row);
    }
    rows.push(` ${'-'.repeat(this._width)}`);
    return `${rows.join('\n')}\n`;
  }

  getStyledCharacter() {
    const rows = [];
    rows.push(chalk.gray(` ${'-'.repeat(this._width)}`));
    for (let y = 0; y < this._height; y++) {
      let row = chalk.gray('|');
      for (let x = 0; x < this._width; x++) {
        row += this.getSpace(x, y).getStyledCharacter();
      }
      row += chalk.gray('|');
      rows.push(row);
    }
    rows.push(chalk.gray(` ${'-'.repeat(this._width)}`));
    return `${rows.join('\n')}\n`;
  }
}

export default Floor;
