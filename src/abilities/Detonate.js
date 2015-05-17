import Base from './Base';

class Detonate extends Base {
  getDescription() {
    return 'Detonate a bomb in a given direction (forward by default) which damages that space and surrounding 4 spaces (including yourself).';
  }

  perform(direction = 'forward') {
    this.verifyDirection(direction);
    if (this._unit.getPosition()) {
      this._unit.say(`detonates a bomb ${direction} launching a deadly explosion.`);
      this.bomb(direction, 1, 0, 8);
      [[1, 1], [1, -1], [2, 0], [0, 0]].forEach((space) => {
        const [x, y] = space;
        this.bomb(direction, x, y, 4);
      });
    }
  }

  bomb(direction, x, y, damageAmount) {
    if (this._unit.getPosition()) {
      const receiver = this.getSpace(direction, x, y).getUnit();
      if (receiver) {
        if (receiver.getActions().explode) {
          receiver.say('caught in bomb\'s flames which detonates ticking explosive');
          receiver.getActions().explode.perform();
        } else {
          this.damage(receiver, damageAmount);
        }
      }
    }
  }
}

export default Detonate;
