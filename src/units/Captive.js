import chalk from 'chalk';
import Base from './Base';

class Captive extends Base {
  constructor() {
    super();
    this.bind();
  }

  getMaxHealth() {
    return 1;
  }

  getCharacter() {
    return this.style('C');
  }

  style(str) {
    return chalk.magenta(str);
  }
}

export default Captive;
