/** Class representing a tower. */
class Tower {
  id: string;
  name: string;
  description: string;
  levels: unknown[];

  constructor(id: string, name: string, description: string, levels: unknown[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.levels = levels;
  }

  hasLevel(levelNumber: number): boolean {
    return !!this.getLevel(levelNumber);
  }

  getLevel(levelNumber: number): unknown {
    return this.levels[levelNumber - 1];
  }

  toString(): string {
    return this.name;
  }
}

export default Tower;
