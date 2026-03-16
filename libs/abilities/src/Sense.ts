import Ability from './Ability.js';

abstract class Sense extends Ability {
  abstract perform(...args: unknown[]): unknown;
}

export default Sense;
