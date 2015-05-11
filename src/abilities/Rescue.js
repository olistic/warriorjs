import Base from './Base';

class Rescue extends Base {
  getDescription() {
    return 'Rescue a captive from his chains (earning 20 points) in given direction (forward by default).';
  }

  perform(direction = 'forward') {
    this.verifyDirection(direction);
    if (this.getSpace(direction).isCaptive()) {
      const recipient = this.getUnit(direction);
      this._unit.say(`unbinds ${direction} and rescues ${recipient}`);
      recipient.unbind();
      recipient.setPosition(null);
      this._unit.earnPoints(20);
    } else {
      this._unit.say(`unbinds ${direction} and rescues nothing`);
    }
  }
}

export default Rescue;
