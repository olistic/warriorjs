import path from 'path';

import findUp from 'find-up';
import globby from 'globby';
import resolve from 'resolve';

import Tower from './Tower';

const officialTowerPackageJsonPattern = '@warriorjs/tower-*/package.json';
const communityTowerPackageJsonPattern = 'warriorjs-tower-*/package.json';

/**
 * Loads the installed towers.
 *
 * It searches for official and community towers installed in the nearest
 * `node_modules` directory that is parent to @warriorjs/cli.
 *
 * @returns {Tower[]} The loaded towers.
 */
function loadTowers() {
  const internalTowers = [require('@warriorjs/tower-beginner')]; // eslint-disable-line global-require

  const warriorjsCliDir = findUp.sync('@warriorjs/cli', { cwd: __dirname });
  const towerSearchDir = findUp.sync('node_modules', { cwd: warriorjsCliDir });
  const towerPackageJsonPaths = globby.sync(
    [officialTowerPackageJsonPattern, communityTowerPackageJsonPattern],
    { cwd: towerSearchDir },
  );
  const towerPackageNames = towerPackageJsonPaths.map(path.dirname);
  const towerRequirePaths = towerPackageNames.map(towerPackageName =>
    resolve.sync(towerPackageName, { basedir: towerSearchDir }),
  );
  const externalTowers = towerRequirePaths.map(
    towerRequirePath => require(towerRequirePath), // eslint-disable-line global-require, import/no-dynamic-require
  );
  return internalTowers
    .concat(externalTowers)
    .map(({ name, levels }) => new Tower(name, levels));
}

export default loadTowers;
