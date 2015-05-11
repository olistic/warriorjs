import Base from './Base';

class Wizard extends Base {
  constructor() {
    super();
    this.addActions(['shoot']);
    this.addSenses(['look']);
  }

  playTurn(turn) {
    ['forward', 'left', 'right', 'backward'].forEach((direction) => {
      turn.look(direction).forEach((space) => {
        if (space.isPlayer()) {
          turn.shoot(direction);
          return;
        }
      });
    });
  }

  getShootPower() {
    return 11;
  }

  getMaxHealth() {
    return 3;
  }

  getCharacter() {
    return 'w';
  }
}

export default Wizard;
