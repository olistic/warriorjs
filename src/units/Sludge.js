import chalk from 'chalk';
import Melee from './Melee';

class Sludge extends Melee {
  constructor() {
    super();
    this.addActions(['attack']);
  }

  playTurn(turn) {
    ['forward', 'left', 'right', 'backward'].some((direction) => {
      if (turn.feel(direction).isPlayer()) {
        turn.attack(direction);
        return true;
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
