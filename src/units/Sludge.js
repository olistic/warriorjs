import chalk from 'chalk';
import Base from './Base';

class Sludge extends Base {
  constructor() {
    super();
    this.addActions(['attack']);
    this.addSenses(['feel']);
  }

  playTurn(turn) {
    ['forward', 'left', 'right', 'backward'].forEach((direction) => {
      if (turn.feel(direction).isPlayer()) {
        turn.attack(direction);
        return;
      }
    });
  }

  getAttackPower() {
    return 3;
  }

  getMaxHealth() {
    return 12;
  }

  getCharacter() {
    return this.style('s');
  }

  style(str) {
    return chalk.green(str);
  }
}

export default Sludge;
