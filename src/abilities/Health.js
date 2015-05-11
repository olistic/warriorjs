import Base from './Base';

class Health extends Base {
  getDescription() {
    return 'Returns an integer representing your health.';
  }

  perform() {
    return this._unit.getHealth();
  }
}

export default Health;
