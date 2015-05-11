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
}

export default Turn;
