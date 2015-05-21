import Base from './Base';

class Explode extends Base {
  getDescription() {
    return 'Kills you and all surrounding units. You probably don\'t want to do this intentionally.';
  }

  getTime() {
    return this._time;
  }

  setTime(time) {
    this._time = time;
  }

  perform() {
    if (this._unit.getPosition()) {
      this._unit.say(`explodes, collapsing the ceiling and damaging every unit.`);
      this._unit.getPosition().getFloor().getUnits().forEach((unit) => unit.takeDamage(100));
    }
  }

  passTurn() {
    if (this._time && this._unit.getPosition()) {
      this._unit.say('is ticking');
      this._time -= 1;
      if (this._time === 0) {
        this.perform();
      }
    }
  }
}

export default Explode;
