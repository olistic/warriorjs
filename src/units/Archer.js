import chalk from 'chalk';
import Base from './Base';

class Archer extends Base {
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
