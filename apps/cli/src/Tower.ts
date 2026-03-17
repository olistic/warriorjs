import type { LevelDefinition, WarriorDefinition } from '@warriorjs/core';

/** Class representing a tower. */
class Tower {
  id: string;
  name: string;
  description: string;
  warrior: WarriorDefinition;
  levels: LevelDefinition[];

  constructor(
    id: string,
    name: string,
    description: string,
    warrior: WarriorDefinition,
    levels: LevelDefinition[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.warrior = warrior;
    this.levels = levels;
  }

  hasLevel(levelNumber: number): boolean {
    return !!this.getLevel(levelNumber);
  }

  getLevel(levelNumber: number): LevelDefinition | undefined {
    return this.levels[levelNumber - 1];
  }

  toString(): string {
    return this.name;
  }
}

export default Tower;
