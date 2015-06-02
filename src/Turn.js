class Turn {
  constructor(actions, senses) {
    this._action = null;
    this._senses = {};

    Object.keys(actions).forEach((name) => {
      this.addAction(name);
    });

    Object.keys(senses).forEach((name) => {
      this.addSense(name, senses[name]);
    });
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
      },
      enumerable: true
    });
  }

  addSense(name, sense) {
    this._senses[name] = sense;
    Object.defineProperty(this, name, {
      value: (...args) => {
        return this._senses[name].perform(...args);
      },
	  enumerable: true
    });
  }
  
  /** Makes a new object that acts like a proxy of a Turn. Allows to access its methods without
  the risk of exposing intimate details of the implementation, to the code provided by the user.
  */
  playerObject() {
    var result = {};
	var turn = this;
	Object.keys(this).forEach((id) => {
	  if (typeof turn[id] === 'function') {
        result[id] = turn[id].bind(turn);
	  }
    });
    return result;
  }
}

export default Turn;
