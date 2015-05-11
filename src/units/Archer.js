import Base from './Base';

class Archer extends Base {
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
    return 3;
  }

  getMaxHealth() {
    return 7;
  }

  getCharacter() {
    return 'a';
  }
}

export default Archer;
