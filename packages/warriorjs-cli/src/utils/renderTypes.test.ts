import { describe, expect, test } from 'vitest';

import renderTypes from './renderTypes.js';

const mockAbilities = {
  walk: () => ({
    action: true,
    description: 'Walks forward',
    perform() {},
    meta: {
      params: [{ name: 'direction', type: 'Direction' as const, optional: true }],
      returns: 'void' as const,
    },
  }),
  feel: () => ({
    description: 'Feels the space ahead',
    perform() {},
    meta: {
      params: [{ name: 'direction', type: 'Direction' as const, optional: true }],
      returns: 'Space' as const,
    },
  }),
  health: () => ({
    description: 'Returns current health',
    perform() {},
    meta: {
      params: [] as any[],
      returns: 'number' as const,
    },
  }),
};

const profile: any = { language: 'typescript' };

function makeLevelConfig(abilities: Record<string, any>): any {
  return { floor: { warrior: { abilities } } };
}

describe('renderTypes', () => {
  test('renders types with a single action', () => {
    expect(renderTypes(profile, makeLevelConfig({ walk: mockAbilities.walk }))).toBe(
      [
        '// @generated — Auto-generated each level. Do not edit.',
        '',
        "export type Direction = 'forward' | 'right' | 'backward' | 'left';",
        '',
        'export interface Warrior {',
        '  /** Walks forward */',
        '  walk(direction?: Direction): void;',
        '}',
        '',
      ].join('\n'),
    );
  });

  test('renders types with actions before senses, both sorted alphabetically', () => {
    expect(
      renderTypes(
        profile,
        makeLevelConfig({
          health: mockAbilities.health,
          walk: mockAbilities.walk,
          feel: mockAbilities.feel,
        }),
      ),
    ).toBe(
      [
        '// @generated — Auto-generated each level. Do not edit.',
        '',
        "export type Direction = 'forward' | 'right' | 'backward' | 'left';",
        '',
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
        '',
        'export interface Warrior {',
        '  /** Walks forward */',
        '  walk(direction?: Direction): void;',
        '  /** Feels the space ahead */',
        '  feel(direction?: Direction): Space;',
        '  /** Returns current health */',
        '  health(): number;',
        '}',
        '',
      ].join('\n'),
    );
  });

  test('omits Space and SensedUnit interfaces when no abilities use Space', () => {
    expect(
      renderTypes(
        profile,
        makeLevelConfig({ walk: mockAbilities.walk, health: mockAbilities.health }),
      ),
    ).toBe(
      [
        '// @generated — Auto-generated each level. Do not edit.',
        '',
        "export type Direction = 'forward' | 'right' | 'backward' | 'left';",
        '',
        'export interface Warrior {',
        '  /** Walks forward */',
        '  walk(direction?: Direction): void;',
        '  /** Returns current health */',
        '  health(): number;',
        '}',
        '',
      ].join('\n'),
    );
  });

  test('skips abilities without meta', () => {
    const noMetaAbility = () => ({
      description: 'No meta',
      perform() {},
    });
    expect(
      renderTypes(profile, makeLevelConfig({ walk: mockAbilities.walk, legacy: noMetaAbility })),
    ).toBe(
      [
        '// @generated — Auto-generated each level. Do not edit.',
        '',
        "export type Direction = 'forward' | 'right' | 'backward' | 'left';",
        '',
        'export interface Warrior {',
        '  /** Walks forward */',
        '  walk(direction?: Direction): void;',
        '}',
        '',
      ].join('\n'),
    );
  });

  test('handles rest parameters', () => {
    const restAbility = () => ({
      action: true,
      description: 'Does something with rest params',
      perform() {},
      meta: {
        params: [{ name: 'targets', type: 'string', rest: true }],
        returns: 'void' as const,
      },
    });
    expect(renderTypes(profile, makeLevelConfig({ multi: restAbility }))).toBe(
      [
        '// @generated — Auto-generated each level. Do not edit.',
        '',
        "export type Direction = 'forward' | 'right' | 'backward' | 'left';",
        '',
        'export interface Warrior {',
        '  /** Does something with rest params */',
        '  multi(...targets: string[]): void;',
        '}',
        '',
      ].join('\n'),
    );
  });

  test('handles empty abilities', () => {
    expect(renderTypes(profile, makeLevelConfig({}))).toBe(
      [
        '// @generated — Auto-generated each level. Do not edit.',
        '',
        "export type Direction = 'forward' | 'right' | 'backward' | 'left';",
        '',
        'export interface Warrior {',
        '}',
        '',
      ].join('\n'),
    );
  });
});
