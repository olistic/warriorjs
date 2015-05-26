import Sludge from './Sludge';

class ThickSludge extends Sludge {
  getMaxHealth() {
    return 24;
  }

  getCharacter() {
    return this.style('S');
  }
}

export default ThickSludge;
