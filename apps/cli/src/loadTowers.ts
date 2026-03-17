import { createRequire } from 'node:module';
import path from 'node:path';
import { findUpSync } from 'find-up';
import { globbySync } from 'globby';

import Tower from './Tower.js';
import getTowerId from './utils/getTowerId.js';

const require = createRequire(import.meta.url);

const internalTowerPackageNames = ['@warriorjs/tower-the-narrow-path'];

const officialTowerPackageJsonPattern = '@warriorjs/tower-*/package.json';
const communityTowerPackageJsonPattern = 'warriorjs-tower-*/package.json';

interface TowerInfo {
  id: string;
  requirePath: string;
}

function getInternalTowersInfo(): TowerInfo[] {
  return internalTowerPackageNames.map((towerPackageName) => ({
    id: getTowerId(towerPackageName),
    requirePath: towerPackageName,
  }));
}

function getExternalTowersInfo(): TowerInfo[] {
  const cliDir = findUpSync('@warriorjs/cli', { cwd: import.meta.dirname, type: 'directory' });
  if (!cliDir) {
    return [];
  }

  const cliParentDir = path.resolve(cliDir, '..');
  const towerSearchDir = findUpSync('node_modules', { cwd: cliParentDir, type: 'directory' });
  if (!towerSearchDir) {
    return [];
  }

  const towerPackageJsonPaths = globbySync(
    [officialTowerPackageJsonPattern, communityTowerPackageJsonPattern],
    { cwd: towerSearchDir },
  );
  const towerPackageNames = towerPackageJsonPaths.map((p: string) => path.dirname(p));
  const seen = new Map<string, TowerInfo>();
  for (const towerPackageName of towerPackageNames) {
    const id = getTowerId(towerPackageName);
    if (!seen.has(id)) {
      seen.set(id, {
        id,
        requirePath: path.resolve(towerSearchDir, towerPackageName),
      });
    }
  }
  return [...seen.values()];
}

function loadTowers(): Tower[] {
  const internalTowersInfo = getInternalTowersInfo();
  const externalTowersInfo = getExternalTowersInfo();
  const allInfo = internalTowersInfo.concat(externalTowersInfo);
  const uniqueInfo = [...new Map(allInfo.map((item) => [item.id, item])).values()];
  return uniqueInfo.map(({ id, requirePath }) => {
    const mod = require(requirePath);
    const { name, description, warrior, levels } = mod.default || mod;
    return new Tower(id, name, description, warrior, levels);
  });
}

export default loadTowers;
