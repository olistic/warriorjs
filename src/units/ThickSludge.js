import Sludge from './Sludge';

class ThickSludge extends Sludge {
  getMaxHealth() {
    return 24;
  }

  getCharacter() {
    return 'S';
  }
}

export default ThickSludge;
