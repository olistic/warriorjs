const ALLOWED_MEMBERS = ['attack', 'bind', 'detonate', 'directionOf',
                         'directionOfStairs', 'distanceOf', 'explode', 'feel',
                         'health', 'listen', 'look', 'pivot', 'rescue', 'rest',
                         'shoot', 'walk'];

class Turn {
  constructor(actions, senses) {
    this._action = null;
    this._senses = {};

    Object.keys(actions).forEach((name) => this.addAction(name));
    Object.keys(senses).forEach((name) => this.addSense(name, senses[name]));
  }

  getAction() {
    return this._action;
  }

  addAction(name) {
    Object.defineProperty(this, name, {
      value: (...args) => {
        if (this._action) {
          throw new Error('Only one action can be performed per turn.');
        }

        this._action = [name, args];
      }
    });
  }

  addSense(name, sense) {
    this._senses[name] = sense;
    Object.defineProperty(this, name, {
      value: (...args) => {
        return this._senses[name].perform(...args);
      }
    });
  }

  /**
   * Make a new object that acts like a proxy of the Turn, preventing the player
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

    return playerObject;
  }
}

export default Turn;
