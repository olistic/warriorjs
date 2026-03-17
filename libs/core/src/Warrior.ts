import Action from './Action.js';
import Unit from './Unit.js';

interface AbilityInfo {
  name: string;
  isAction: boolean;
  description?: string;
}

/** Class representing a warrior. */
class Warrior extends Unit {
  constructor(name?: string, character?: string, color?: string, maxHealth?: number) {
    super(name, character, color, maxHealth, null, false);
  }

  performTurn(): void {
    super.performTurn();
    const turn = this.turn as { action: [string, any[]] | null };
    if (!turn.action || this.isBound()) {
      this.log('does nothing');
    }
  }

  earnPoints(points: number): void {
    super.earnPoints(points);
    this.log(`earns ${points} points`);
  }

  losePoints(points: number): void {
    super.losePoints(points);
    this.log(`loses ${points} points`);
  }

  getAbilities(): {
    actions: Omit<AbilityInfo, 'isAction'>[];
    senses: Omit<AbilityInfo, 'isAction'>[];
  } {
    const abilities: AbilityInfo[] = [...this.abilities].map(([name, ability]) => ({
      name,
      isAction: ability instanceof Action,
      description: ability.description,
    }));
    const sortedAbilities = abilities.sort((a, b) => (a.name > b.name ? 1 : -1));
    const actions = sortedAbilities
      .filter((ability) => ability.isAction)
      .map(({ isAction, ...rest }) => rest);
    const senses = sortedAbilities
      .filter((ability) => !ability.isAction)
      .map(({ isAction, ...rest }) => rest);
    return {
      actions,
      senses,
    };
  }

  getStatus(): { health: number; score: number } {
    return {
      health: this.health,
      score: this.score,
    };
  }
}

export default Warrior;
