import { getLevel, type LevelConfig } from '@warriorjs/core';
import type Profile from '../Profile.js';
import getFloorMap from './getFloorMap.js';
import getFloorMapKey from './getFloorMapKey.js';

interface Ability {
  name: string;
  description: string;
}

function renderHeader(profile: Profile): string {
  return `# ${profile.warriorName} - ${profile.tower.name}`;
}

function renderTowerDescription(description: string): string {
  if (!description) return '';
  return `### _${description}_`;
}

function renderLevelInfo(level: any): string {
  return `## Level ${level.number}\n\n_${level.description}_\n\n> **TIP:** ${level.tip}`;
}

function renderClue(profile: Profile, clue: string): string {
  if (!profile.isShowingClue()) return '';
  return `> **CLUE:** ${clue}`;
}

function renderFloorMap(level: any): string {
  return `### Floor Map\n\n\`\`\`\n${getFloorMap(level.floorMap)}\n\n${getFloorMapKey(level.floorMap)}\n\`\`\``;
}

function renderAbilityList(abilities: Ability[]): string {
  return abilities.map((a) => `- \`warrior.${a.name}()\`: ${a.description}`).join('\n');
}

function renderActions(actions: Ability[]): string {
  return `### Actions (only one per turn)\n\n${renderAbilityList(actions)}`;
}

function renderSenses(senses: Ability[]): string {
  if (!senses.length) return '';
  return `### Senses\n\n${renderAbilityList(senses)}`;
}

function renderAbilities(level: any): string {
  const sections = [
    '## Abilities',
    renderActions(level.warriorAbilities.actions),
    renderSenses(level.warriorAbilities.senses),
  ].filter(Boolean);
  return sections.join('\n\n');
}

function renderNextSteps(profile: Profile): string {
  const playerFile = profile.language === 'typescript' ? 'Player.ts' : 'Player.js';
  return `## Next Steps\n\nWhen you're done editing \`${playerFile}\`, run the \`warriorjs\` command again.`;
}

function renderReadme(profile: Profile, levelConfig: LevelConfig): string {
  const level = getLevel(levelConfig);

  const sections = [
    renderHeader(profile),
    renderTowerDescription(profile.tower.description),
    renderLevelInfo(level),
    renderClue(profile, level.clue),
    renderFloorMap(level),
    renderAbilities(level),
    renderNextSteps(profile),
  ].filter(Boolean);

  return `${sections.join('\n\n')}\n`;
}

export default renderReadme;
