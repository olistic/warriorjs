import Base from './Base';

class Captive extends Base {
  constructor() {
    super();
    this.bind();
  }

  getMaxHealth() {
    return 1;
  }

  getCharacter() {
    return 'C';
  }
}

export default Captive;
