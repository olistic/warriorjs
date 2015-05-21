import _ from 'lodash';
import chalk from 'chalk';
import Turn from '../Turn';
import UI from '../UI';
import Attack from '../abilities/Attack';
import Bind from '../abilities/Bind';
import Detonate from '../abilities/Detonate';
import DirectionOf from '../abilities/DirectionOf';
import DirectionOfStairs from '../abilities/DirectionOfStairs';
import DistanceOf from '../abilities/DistanceOf';
import Explode from '../abilities/Explode';
import Feel from '../abilities/Feel';
import Health from '../abilities/Health';
import Listen from '../abilities/Listen';
import Look from '../abilities/Look';
import Pivot from '../abilities/Pivot';
import Rescue from '../abilities/Rescue';
import Rest from '../abilities/Rest';
import Shoot from '../abilities/Shoot';
import Walk from '../abilities/Walk';

class Base {
  constructor() {
    this._position = null;
    this._health = null;
    this._actions = {};
    this._senses = {};
    this._style = chalk.white;
  }

  getPosition() {
    return this._position;
  }

  setPosition(position) {
    this._position = position;
  }

  getAttackPower() {
    return 0;
  }

  getMaxHealth() {
    return 0;
  }

  getHealth() {
    this._health = this._health !== null ? this._health : this.getMaxHealth();
    return this._health;
  }

  setHealth(health) {
    this._health = health;
  }

  earnPoints(points) {
    // To be overriden by subclass
  }

  takeDamage(amount) {
    if (this.isBound()) {
      this.unbind();
    }

    if (this.getHealth() !== null) {
      this._health -= amount;
      this.say(`takes ${chalk.bold(amount)} damage, ${chalk.bold(this.getHealth())} health power left`);
      if (this.getHealth() <= 0) {
        this._position = null;
        this.say('dies');
      }
    }
  }

  isAlive() {
    return this.getPosition() !== null;
  }

  isBound() {
    return this._bound;
  }

  unbind() {
    this.say('released from bonds');
    this._bound = false;
  }

  bind() {
    this._bound = true;
  }

  say(msg) {
    UI.printLineWithDelay(this._style(`${this.getName()} ${msg}`));
  }

  getName() {
    return _.startCase(this.constructor.name);
  }

  toString() {
    return this.getName();
  }

  addActions(newActions) {
    newActions.forEach((action) => {
      switch (action) {
        case 'attack':
          this._actions[action] = new Attack(this);
          break;
        case 'bind':
          this._actions[action] = new Bind(this);
          break;
        case 'detonate':
          this._actions[action] = new Detonate(this);
          break;
        case 'explode':
          this._actions[action] = new Explode(this);
          break;
        case 'pivot':
          this._actions[action] = new Pivot(this);
          break;
        case 'rescue':
          this._actions[action] = new Rescue(this);
          break;
        case 'rest':
          this._actions[action] = new Rest(this);
          break;
        case 'shoot':
          this._actions[action] = new Shoot(this);
          break;
        case 'walk':
          this._actions[action] = new Walk(this);
          break;
        default:
          throw new Error(`Unknown action ${action}.`);
      }
    });
  }

  addSenses(newSenses) {
    newSenses.forEach((sense) => {
      switch (sense) {
        case 'directionOf':
          this._senses[sense] = new DirectionOf(this);
          break;
        case 'directionOfStairs':
          this._senses[sense] = new DirectionOfStairs(this);
          break;
        case 'distanceOf':
          this._senses[sense] = new DistanceOf(this);
          break;
        case 'feel':
          this._senses[sense] = new Feel(this);
          break;
        case 'health':
          this._senses[sense] = new Health(this);
          break;
        case 'listen':
          this._senses[sense] = new Listen(this);
          break;
        case 'look':
          this._senses[sense] = new Look(this);
          break;
        default:
          throw new Error(`Unknown sense ${sense}.`);
      }
    });
  }

  getNextTurn() {
    return new Turn(this.getActions(), this.getSenses());
  }

  prepareTurn() {
    this._currentTurn = this.getNextTurn();
    this.playTurn(this._currentTurn);
  }

  performTurn() {
    if (this._position) {
      Object.keys(this.getAbilities()).forEach((name) => {
        this.getAbilities()[name].passTurn();
      });
      if (this._currentTurn.getAction() && !this.isBound()) {
        const [name, args] = this._currentTurn.getAction();
        this._actions[name].perform(...args);
      }
    }
  }

  playTurn(turn) {
    // To be overriden by subclass
  }

  getAbilities() {
    return Object.assign(this._actions, this._senses);
  }

  getActions() {
    return this._actions;
  }

  getSenses() {
    return this._senses;
  }

  getCharacter() {
    return '?';
  }

  getStyledCharacter() {
    return this._style(this.getCharacter());
  }
}

export default Base;
