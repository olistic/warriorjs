import chalk from 'chalk';
import Ranged from './Ranged';

class Archer extends Ranged {
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
    return 3;
  }

  getMaxHealth() {
    return 7;
  }

  getCharacter() {
    return this.style('a');
  }

  style(str) {
    return chalk.red(str);
  }
}

export default Archer;
