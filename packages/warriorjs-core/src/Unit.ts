import Logger from './Logger.js';
import type Position from './Position.js';
import type { SensedSpace, SensedUnit } from './Space.js';
import Space from './Space.js';

interface Ability {
  action?: boolean;
  description?: string;
  perform(...args: any[]): any;
}

interface Effect {
  passTurn(): void;
  trigger(): void;
}

interface Turn {
  action: [string, any[]] | null;
  [key: string]: any;
}

/** Class representing a unit. */
class Unit {
  name: string;
  character: string;
  color: string;
  maxHealth: number;
  reward: number;
  enemy: boolean;
  bound: boolean;
  position: Position | null;
  health: number;
  score: number;
  abilities: Map<string, Ability>;
  effects: Map<string, Effect>;
  turn: Turn | Record<string, never>;
  playTurn: (turn: any) => void;

  constructor(
    name?: string,
    character?: string,
    color?: string,
    maxHealth?: number,
    reward: number | null = null,
    enemy: boolean = true,
    bound: boolean = false,
  ) {
    this.name = name!;
    this.character = character!;
    this.color = color!;
    this.maxHealth = maxHealth!;
    this.reward = reward === null ? maxHealth! : reward;
    this.enemy = enemy;
    this.bound = bound;
    this.position = null;
    this.health = maxHealth!;
    this.score = 0;
    this.abilities = new Map();
    this.effects = new Map();
    this.turn = {};
    this.playTurn = () => {};
  }

  getNextTurn(): Turn {
    const turn: Turn = { action: null };
    this.abilities.forEach((ability, name) => {
      if (ability.action) {
        Object.defineProperty(turn, name, {
          value: (...args: any[]) => {
            if (turn.action) {
              throw new Error('Only one action can be performed per turn.');
            }

            turn.action = [name, args];
          },
        });
      } else {
        Object.defineProperty(turn, name, {
          value: (...args: any[]) => ability.perform(...args),
        });
      }
    });
    return turn;
  }

  prepareTurn(): void {
    this.turn = this.getNextTurn();
    this.playTurn(this.turn);
  }

  performTurn(): void {
    if (this.isAlive()) {
      this.effects.forEach((effect) => effect.passTurn());
      const turn = this.turn as Turn;
      if (turn.action && !this.isBound()) {
        const [name, args] = turn.action;
        this.abilities.get(name)?.perform(...args);
      }
    }
  }

  heal(amount: number): void {
    const revisedAmount =
      this.health + amount > this.maxHealth ? this.maxHealth - this.health : amount;
    this.health += revisedAmount;
    this.log(`receives ${amount} health, up to ${this.health} health`);
  }

  takeDamage(amount: number): void {
    if (this.isBound()) {
      this.unbind();
    }

    const revisedAmount = this.health - amount < 0 ? this.health : amount;
    this.health -= revisedAmount;
    this.log(`takes ${amount} damage, ${this.health} health power left`);

    if (this.health === 0) {
      this.vanish();
      this.log('dies');
    }
  }

  damage(receiver: Unit, amount: number): void {
    receiver.takeDamage(amount);
    if (!receiver.isAlive()) {
      if (receiver.as(this).isEnemy()) {
        this.earnPoints(receiver.reward);
      } else {
        this.losePoints(receiver.reward);
      }
    }
  }

  isAlive(): boolean {
    return this.position !== null;
  }

  release(receiver: Unit): void {
    if (!receiver.as(this).isEnemy()) {
      receiver.vanish();
    }

    receiver.unbind();
    if (!receiver.isAlive()) {
      this.earnPoints(receiver.reward);
    }
  }

  unbind(): void {
    this.bound = false;
    this.log('released from bonds');
  }

  bind(): void {
    this.bound = true;
  }

  isBound(): boolean {
    return this.bound;
  }

  earnPoints(points: number): void {
    this.score += points;
  }

  losePoints(points: number): void {
    this.score -= points;
  }

  addAbility(name: string, ability: Ability): void {
    this.abilities.set(name, ability);
  }

  addEffect(name: string, effect: Effect): void {
    this.effects.set(name, effect);
  }

  triggerEffect(name: string): void {
    const effect = this.effects.get(name);
    if (effect) {
      effect.trigger();
    }
  }

  isUnderEffect(name: string): boolean {
    return this.effects.has(name);
  }

  getOtherUnits(): Unit[] {
    return this.position!.floor.getUnits().filter((unit) => unit !== this);
  }

  getSpace(): Space {
    return this.position!.getSpace();
  }

  getSensedSpaceAt(direction: string, forward: number = 1, right: number = 0): SensedSpace {
    return this.getSpaceAt(direction, forward, right).as(this);
  }

  getSpaceAt(direction: string, forward: number = 1, right: number = 0): Space {
    return this.position!.getRelativeSpace(direction, [forward, right]);
  }

  getDirectionOfStairs(): string {
    return this.position!.getRelativeDirectionOf(this.position!.floor.getStairsSpace());
  }

  getDirectionOf(sensedSpace: SensedSpace): string {
    const space = Space.from(sensedSpace, this);
    return this.position!.getRelativeDirectionOf(space);
  }

  getDistanceOf(sensedSpace: SensedSpace): number {
    const space = Space.from(sensedSpace, this);
    return this.position!.getDistanceOf(space);
  }

  move(direction: string, forward: number = 1, right: number = 0): void {
    this.position!.move(direction, [forward, right]);
  }

  rotate(direction: string): void {
    this.position?.rotate(direction);
  }

  vanish(): void {
    this.position = null;
  }

  log(message: string): void {
    Logger.unit(this, message);
  }

  as(unit: Unit): SensedUnit {
    return {
      isBound: this.isBound.bind(this),
      isEnemy: () => this.enemy !== unit.enemy,
      isUnderEffect: this.isUnderEffect.bind(this),
    };
  }

  toString(): string {
    return this.name;
  }

  toJSON(): { name: string; color: string; maxHealth: number } {
    return {
      name: this.name,
      color: this.color,
      maxHealth: this.maxHealth,
    };
  }
}

export default Unit;
