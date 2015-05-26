import chalk from 'chalk';
import Ranged from './Ranged';

class Wizard extends Ranged {
  constructor() {
    super();
    this.addActions(['shoot']);
  }

  playTurn(turn) {
    ['forward', 'left', 'right', 'backward'].some((direction) => {
      if (this.isPlayerInSight(turn, direction)) {
        turn.shoot(direction);
        return true;
      }
    });
  }

  getShootPower() {
    return 11;
  }

  getMaxHealth() {
    return 3;
  }

  getCharacter() {
    return this.style('w');
  }

  style(str) {
    return chalk.cyan(str);
  }
}

export default Wizard;
