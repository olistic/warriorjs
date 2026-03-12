import type { LevelConfig } from '@warriorjs/core';
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
    'export interface SensedUnit {',
    '  isBound(): boolean;',
    '  isEnemy(): boolean;',
    '  isUnderEffect(name: string): boolean;',
    '}',
    '',
    'export interface Space {',
    '  getLocation(): [number, number];',
    '  getUnit(): SensedUnit | null;',
    '  isEmpty(): boolean;',
    '  isStairs(): boolean;',
    '  isUnit(): boolean;',
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

function renderTypes(_profile: Profile, levelConfig: LevelConfig): string {
  const abilities = levelConfig.floor.warrior.abilities ?? {};

  const methods: MethodEntry[] = [];
  let needsSpace = false;

  for (const [name, creator] of Object.entries(abilities)) {
    const ability = creator({} as any);
    if (!ability.meta) {
      continue;
    }

    const { meta } = ability;

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
      action: !!ability.action,
      description: ability.description,
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
