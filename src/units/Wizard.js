import chalk from 'chalk';
import Base from './Base';

class Wizard extends Base {
  constructor() {
    super();
    this.addActions(['shoot']);
    this.addSenses(['look']);
  }

  playTurn(turn) {
    let shot = false;
    ['forward', 'left', 'right', 'backward'].every((direction) => {
      if (!shot) {
        turn.look(direction).every((space) => {
          if (space.isPlayer()) {
            turn.shoot(direction);
            shot = true;
            return false;
          }

          return space.isEmpty();
        });
      }

      return !shot;
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
