import _ from 'lodash';
import Warrior from './units/Warrior';

const ALLOWED_MEMBERS = ['isWall', 'isWarrior', 'isPlayer', 'isEnemy',
                         'isCaptive', 'isEmpty', 'isStairs', 'isTicking'];

let originalInstances = new WeakMap();

class Space {
  constructor(floor, x, y) {
    this._floor = floor;
    this._x = x;
    this._y = y;
  }

  isWall() {
    return this._floor.isOutOfBounds(this._x, this._y);
  }

  isWarrior() {
    return this.getUnit() instanceof Warrior;
  }

  isPlayer() {
    return this.isWarrior();
  }

  isEnemy() {
    return this.getUnit() && !this.isPlayer() && !this.isCaptive();
  }

  isCaptive() {
    return this.getUnit() && this.getUnit().isBound();
  }

  isEmpty() {
    return !this.getUnit() && !this.isWall();
  }

  isStairs() {
    return _.isEqual(this._floor.getStairsLocation(), this.getLocation());
  }

  isTicking() {
    return this.getUnit() && Object.keys(this.getUnit().getActions()).includes('explode');
  }

  getUnit() {
    return this._floor.getUnit(this._x, this._y);
  }

  getLocation() {
    return [this._x, this._y];
  }

  /**
   * Make a new object that acts like a proxy of the Space, preventing the player
   * to access methods that don't belong to the Player API
   */
  getPlayerObject(allowedMembers = ALLOWED_MEMBERS) {
    const playerObject = {};

    // Add allowed members to the player object and bind them to the original instance
    allowedMembers.forEach((id) => {
      if (typeof this[id] === 'function') {
        playerObject[id] = this[id].bind(this);
      }
    });

    // Add a flag to the object indicating it is a proxy
    playerObject.isPlayerObject = true;

    // Reference the original instance to the player object
    originalInstances.set(playerObject, this);

    return playerObject;
  }

  getCharacter() {
    if (this.getUnit()) {
      return this.getUnit().getCharacter();
    } else if (this.isStairs()) {
      return '>';
    } else {
      return ' ';
    }
  }

  toString() {
    if (this.getUnit()) {
      return this.getUnit().toString();
    } else if (this.isWall()) {
      return 'wall';
    } else {
      return 'nothing';
    }
  }
}

export default Space;
export { originalInstances as originalSpaces };
