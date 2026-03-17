import Ability from './Ability.js';

abstract class Action extends Ability {
  abstract perform(...args: unknown[]): void;
}

export default Action;
