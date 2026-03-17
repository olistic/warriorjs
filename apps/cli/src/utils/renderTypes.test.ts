import { type AbilityMeta, Action, Sense } from '@warriorjs/core';
import { describe, expect, test } from 'vitest';

import renderTypes from './renderTypes.js';

class MockWalk extends Action {
  readonly description = 'Walks forward';
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'void',
  };
  perform() {}
}

class MockFeel extends Sense {
  readonly description = 'Feels the space ahead';
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'Space',
  };
  perform() {}
}

class MockHealth extends Sense {
  readonly description = 'Returns current health';
  readonly meta: AbilityMeta = {
    params: [],
    returns: 'number',
  };
  perform() {}
}

const profile: any = { language: 'typescript' };

function makeLevelConfig(abilities: Record<string, any>): any {
  return { floor: { warrior: { abilities } } };
}

describe('renderTypes', () => {
  test('renders types with a single action', () => {
    expect(renderTypes(profile, makeLevelConfig({ walk: MockWalk }))).toBe(
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
          health: MockHealth,
          walk: MockWalk,
          feel: MockFeel,
        }),
      ),
    ).toBe(
      [
        '// @generated — Auto-generated each level. Do not edit.',
        '',
        "export type Direction = 'forward' | 'right' | 'backward' | 'left';",
        '',
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

  test('omits Space and Unit interfaces when no abilities use Space', () => {
    expect(renderTypes(profile, makeLevelConfig({ walk: MockWalk, health: MockHealth }))).toBe(
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

  test('handles rest parameters', () => {
    class RestAction extends Action {
      readonly description = 'Does something with rest params';
      readonly meta: AbilityMeta = {
        params: [{ name: 'targets', type: 'any', rest: true }],
        returns: 'void',
      };
      perform() {}
    }
    expect(renderTypes(profile, makeLevelConfig({ multi: RestAction }))).toBe(
      [
        '// @generated — Auto-generated each level. Do not edit.',
        '',
        "export type Direction = 'forward' | 'right' | 'backward' | 'left';",
        '',
        'export interface Warrior {',
        '  /** Does something with rest params */',
        '  multi(...targets: any[]): void;',
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
