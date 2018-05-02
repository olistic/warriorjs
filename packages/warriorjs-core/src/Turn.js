/** Class representing a turn. */
class Turn {
  /**
   * Creates a turn.
   *
   * @param {Map} abilities The abilities available in the turn.
   */
  constructor(abilities) {
    this.action = null;

    abilities.forEach((ability, name) => {
      if (ability.action) {
        this.addAction(name);
      } else {
        this.addSense(name, ability);
      }
    });
  }

  /**
   * Adds an action to the turn.
   *
   * This defines a new method in the turn named after the action. When this new
   * method is called on the turn, the `action` property of the turn is set to
   * an array with the name of the action and the args passed to the action
   * method.
   *
   * If the `action` property of the turn was already set, calling this new
   * method will throw as only one action can be performed per turn.
   *
   * @param {string} name The name of the action.
   */
  addAction(name) {
    Object.defineProperty(this, name, {
      value: (...args) => {
        if (this.action) {
          throw new Error('Only one action can be performed per turn.');
        }

        this.action = [name, args];
      },
    });
  }

  /**
   * Adds a sense to the turn.
   *
   * This defines a new method in the turn named after the sense. When this new
   * method is called on the turn, the sense is performed immediately.
   *
   * @param {string} name The name of the sense.
   * @param {Object} sense The sense.
   */
  addSense(name, sense) {
    Object.defineProperty(this, name, {
      value: (...args) => sense.perform(...args),
    });
  }
}

export default Turn;
