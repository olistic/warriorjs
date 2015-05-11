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
    return 's';
  }
}

export default Sludge;
