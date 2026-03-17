import { type Ability, type AbilityEntry, Action, type LevelConfig } from '@warriorjs/core';
import type Profile from '../Profile.js';

interface MethodEntry {
  name: string;
  action: boolean;
  description: string;
  signature: string;
}

function renderHeader(): string {
  return '// @generated — Auto-generated each level. Do not edit.';
}

function renderDirectionType(): string {
  return "export type Direction = 'forward' | 'right' | 'backward' | 'left';";
}

function renderSpaceInterfaces(): string {
  return [
    'export interface Unit {',
    '  /** Determines if the unit is bound. */',
    '  isBound(): boolean;',
    '  /** Determines if the unit is an enemy. */',
    '  isEnemy(): boolean;',
    '  /** Determines if the unit is under the given effect. */',
    '  isUnderEffect(name: string): boolean;',
    '}',
    '',
    'export interface Space {',
    '  /** Returns the relative location of this space as the offset `[forward, right]`. */',
    '  getLocation(): [number, number];',
    '  /** Returns the unit located at this space, or `null` if there is none. */',
    '  getUnit(): Unit | null;',
    '  /** Determines if nothing (except maybe stairs) is at this space. */',
    '  isEmpty(): boolean;',
    '  /** Determines if the stairs are at this space. */',
    '  isStairs(): boolean;',
    '  /** Determines if there is a unit at this space. */',
    '  isUnit(): boolean;',
    '  /** Determines if this space is the edge of the level. */',
    '  isWall(): boolean;',
    '}',
  ].join('\n');
}

function renderMethod(method: MethodEntry): string {
  return `  /** ${method.description} */\n  ${method.signature};`;
}

function renderWarriorInterface(methods: MethodEntry[]): string {
  if (!methods.length) {
    return 'export interface Warrior {\n}';
  }
  const body = methods.map(renderMethod).join('\n');
  return `export interface Warrior {\n${body}\n}`;
}

function instantiateAbility(entry: AbilityEntry): Ability {
  if (Array.isArray(entry)) {
    const [AbilityClass, config] = entry;
    return new AbilityClass({} as any, config);
  }
  const AbilityClass = entry;
  return new AbilityClass({} as any);
}

function renderTypes(_profile: Profile, levelConfig: LevelConfig): string {
  const abilities = levelConfig.floor.warrior.abilities ?? {};

  const methods: MethodEntry[] = [];
  let needsSpace = false;

  for (const [name, entry] of Object.entries(abilities)) {
    const ability = instantiateAbility(entry);

    const { description, meta } = ability;

    const params: string[] = meta.params.map((param: any) => {
      const tsType = param.type;
      if (tsType === 'Space') {
        needsSpace = true;
      }

      if (param.rest) {
        return `...${param.name}: ${tsType}[]`;
      }

      const optional = param.optional ? '?' : '';
      return `${param.name}${optional}: ${tsType}`;
    });

    const returnType = meta.returns;
    if (returnType === 'Space' || returnType === 'Space[]') {
      needsSpace = true;
    }

    methods.push({
      name,
      description,
      action: ability instanceof Action,
      signature: `${name}(${params.join(', ')}): ${returnType}`,
    });
  }

  const actions = methods.filter((m) => m.action).sort((a, b) => a.name.localeCompare(b.name));
  const senses = methods.filter((m) => !m.action).sort((a, b) => a.name.localeCompare(b.name));
  const sortedMethods = [...actions, ...senses];

  const sections = [
    renderHeader(),
    renderDirectionType(),
    needsSpace ? renderSpaceInterfaces() : '',
    renderWarriorInterface(sortedMethods),
  ].filter(Boolean);

  return `${sections.join('\n\n')}\n`;
}

export default renderTypes;
