import chalk from 'chalk';
import Sludge from './Sludge';

class ThickSludge extends Sludge {
  constructor() {
    super();
    this._style = chalk.yellow;
  }

  getMaxHealth() {
    return 24;
  }

  getCharacter() {
    return 'S';
  }
}

export default ThickSludge;
