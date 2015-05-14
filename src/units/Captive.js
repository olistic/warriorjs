import chalk from 'chalk';
import Base from './Base';

class Captive extends Base {
  constructor() {
    super();
    this._style = chalk.magenta;
    this.bind();
  }

  getMaxHealth() {
    return 1;
  }

  getCharacter() {
    return 'C';
  }
}

export default Captive;
