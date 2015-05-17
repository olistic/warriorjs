import Base from './Base';

class Bind extends Base {
  getDescription() {
    return 'Binds a unit in given direction to keep him from moving (forward by default).';
  }

  perform(direction = 'forward') {
    this.verifyDirection(direction);
    const receiver = this.getUnit(direction);
    if (receiver) {
      this._unit.say(`binds ${direction} and restricts ${receiver}`);
      receiver.bind();
    } else {
      this._unit.say(`binds ${direction} and restricts nothing`);
    }
  }
}

export default Bind;
