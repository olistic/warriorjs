import Base from './Base';

class Rescue extends Base {
  getDescription() {
    return 'Gain 10% of max health back, but do nothing more.';
  }

  perform() {
    if (this._unit.getHealth() < this._unit.getMaxHealth()) {
      let amount = Math.round(this._unit.getMaxHealth() * 0.1);
      if (this._unit.getHealth() + amount > this._unit.getMaxHealth()) {
        amount = this._unit.getMaxHealth() - this._unit.getHealth();
      }

      this._unit.setHealth(this._unit.getHealth() + amount);
      this._unit.say(`receives ${amount} health from resting, up to ${this._unit.getHealth()} health`);
    } else {
      this._unit.say('is already fit as a fiddle');
    }
  }
}

export default Rescue;
