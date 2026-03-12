import { beforeEach, describe, expect, test, vi } from 'vitest';

import renderReadme from './renderReadme.js';

vi.mock('@warriorjs/core', () => ({
  getLevel: vi.fn(),
}));

import { getLevel } from '@warriorjs/core';

describe('renderReadme', () => {
  let profile: any;
  let levelConfig: any;
  let level: any;

  beforeEach(() => {
    profile = {
      warriorName: 'Aldric',
      tower: { name: 'The Narrow Path', description: 'A tower for beginners' },
      language: 'javascript',
      isShowingClue: () => false,
    };
    levelConfig = {
      floor: { warrior: { abilities: {} } },
    };
    level = {
      number: 1,
      description: 'You see a light in the distance.',
      tip: 'Walk towards the light.',
      clue: 'Use warrior.walk()',
      floorMap: [[{ character: '@' }, { character: ' ' }, { character: '>' }]],
      warriorAbilities: {
        actions: [{ name: 'walk', description: 'Walks forward' }],
        senses: [],
      },
    };
    (getLevel as any).mockReturnValue(level);
  });

  test('calls getLevel with levelConfig', () => {
    renderReadme(profile, levelConfig);
    expect(getLevel).toHaveBeenCalledWith(levelConfig);
  });

  test('renders readme for javascript profile', () => {
    expect(renderReadme(profile, levelConfig)).toBe(
      [
        '# Aldric - The Narrow Path',
        '',
        '### _A tower for beginners_',
        '',
        '## Level 1',
        '',
        '_You see a light in the distance._',
        '',
        '> **TIP:** Walk towards the light.',
        '',
        '### Floor Map',
        '',
        '```',
        '@ >',
        '',
        '> = stairs',
        '```',
        '',
        '## Abilities',
        '',
        '### Actions (only one per turn)',
        '',
        '- `warrior.walk()`: Walks forward',
        '',
        '## Next Steps',
        '',
        "When you're done editing `Player.js`, run the `warriorjs` command again.",
        '',
      ].join('\n'),
    );
  });

  test('renders readme for typescript profile', () => {
    profile.language = 'typescript';
    const result = renderReadme(profile, levelConfig);
    expect(result).toMatch(/`Player\.ts`/);
    expect(result).not.toMatch(/`Player\.js`/);
  });

  test('renders readme without tower description', () => {
    profile.tower.description = '';
    const result = renderReadme(profile, levelConfig);
    expect(result).toBe(
      [
        '# Aldric - The Narrow Path',
        '',
        '## Level 1',
        '',
        '_You see a light in the distance._',
        '',
        '> **TIP:** Walk towards the light.',
        '',
        '### Floor Map',
        '',
        '```',
        '@ >',
        '',
        '> = stairs',
        '```',
        '',
        '## Abilities',
        '',
        '### Actions (only one per turn)',
        '',
        '- `warrior.walk()`: Walks forward',
        '',
        '## Next Steps',
        '',
        "When you're done editing `Player.js`, run the `warriorjs` command again.",
        '',
      ].join('\n'),
    );
  });

  test('renders readme with clue when showing', () => {
    profile.isShowingClue = () => true;
    const result = renderReadme(profile, levelConfig);
    expect(result).toBe(
      [
        '# Aldric - The Narrow Path',
        '',
        '### _A tower for beginners_',
        '',
        '## Level 1',
        '',
        '_You see a light in the distance._',
        '',
        '> **TIP:** Walk towards the light.',
        '',
        '> **CLUE:** Use warrior.walk()',
        '',
        '### Floor Map',
        '',
        '```',
        '@ >',
        '',
        '> = stairs',
        '```',
        '',
        '## Abilities',
        '',
        '### Actions (only one per turn)',
        '',
        '- `warrior.walk()`: Walks forward',
        '',
        '## Next Steps',
        '',
        "When you're done editing `Player.js`, run the `warriorjs` command again.",
        '',
      ].join('\n'),
    );
  });

  test('renders readme with actions and senses', () => {
    level.warriorAbilities.senses = [{ name: 'feel', description: 'Feels the space ahead' }];
    const result = renderReadme(profile, levelConfig);
    expect(result).toBe(
      [
        '# Aldric - The Narrow Path',
        '',
        '### _A tower for beginners_',
        '',
        '## Level 1',
        '',
        '_You see a light in the distance._',
        '',
        '> **TIP:** Walk towards the light.',
        '',
        '### Floor Map',
        '',
        '```',
        '@ >',
        '',
        '> = stairs',
        '```',
        '',
        '## Abilities',
        '',
        '### Actions (only one per turn)',
        '',
        '- `warrior.walk()`: Walks forward',
        '',
        '### Senses',
        '',
        '- `warrior.feel()`: Feels the space ahead',
        '',
        '## Next Steps',
        '',
        "When you're done editing `Player.js`, run the `warriorjs` command again.",
        '',
      ].join('\n'),
    );
  });
});
