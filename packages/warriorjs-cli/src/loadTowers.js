import path from 'path';

import findUp from 'find-up';
import globby from 'globby';
import resolve from 'resolve';
import uniqBy from 'lodash.uniqby';

import Tower from './Tower';
import getTowerId from './utils/getTowerId';

const internalTowerPackageNames = ['@warriorjs/tower-baby-steps'];

const officialTowerPackageJsonPattern = '@warriorjs/tower-*/package.json';
const communityTowerPackageJsonPattern = 'warriorjs-tower-*/package.json';

/**
 * Returns the internal towers info.
 *
 * @returns {Object[]} The internal towers info.
 */
function getInternalTowersInfo() {
  return internalTowerPackageNames.map(towerPackageName => ({
    id: getTowerId(towerPackageName),
    requirePath: towerPackageName,
  }));
}

/**
 * Returns the external towers info.
 *
 * It searches for official and community towers installed in the nearest
 * `node_modules` directory that is parent to @warriorjs/cli.
 *
 * @returns {Object[]} The external towers info.
 */
function getExternalTowersInfo() {
  const cliDir = findUp.sync('@warriorjs/cli', { cwd: __dirname });
  if (!cliDir) {
    return [];
  }

  const cliParentDir = path.resolve(cliDir, '..');
  const towerSearchDir = findUp.sync('node_modules', { cwd: cliParentDir });
  const towerPackageJsonPaths = globby.sync(
    [officialTowerPackageJsonPattern, communityTowerPackageJsonPattern],
    { cwd: towerSearchDir },
  );
  const towerPackageNames = towerPackageJsonPaths.map(path.dirname);
  return towerPackageNames.map(towerPackageName => ({
    id: getTowerId(towerPackageName),
    requirePath: resolve.sync(towerPackageName, { basedir: towerSearchDir }),
  }));
}

/**
 * Loads the installed towers.
 *
 * @returns {Tower[]} The loaded towers.
 */
function loadTowers() {
  const internalTowersInfo = getInternalTowersInfo();
  const externalTowersInfo = getExternalTowersInfo();
  return uniqBy(internalTowersInfo.concat(externalTowersInfo), 'id').map(
    ({ id, requirePath }) => {
      const { name, description, levels } = require(requirePath); // eslint-disable-line global-require, import/no-dynamic-require
      return new Tower(id, name, description, levels);
    },
  );
}

export default loadTowers;
