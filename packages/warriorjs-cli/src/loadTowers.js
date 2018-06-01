import path from 'path';

import findUp from 'find-up';
import globby from 'globby';
import resolve from 'resolve';
import uniqBy from 'lodash.uniqby';

import Tower from './Tower';
import getTowerId from './utils/getTowerId';

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
  const internalTowerPackageNames = ['@warriorjs/tower-beginner'];
  const internalTowersInfo = internalTowerPackageNames.map(
    towerPackageName => ({
      id: getTowerId(towerPackageName),
      requirePath: towerPackageName,
    }),
  );

  const cliDir = findUp.sync('@warriorjs/cli', { cwd: __dirname });
  const cliParentDir = path.resolve(cliDir, '..');
  const towerSearchDir = findUp.sync('node_modules', { cwd: cliParentDir });
  const towerPackageJsonPaths = globby.sync(
    [officialTowerPackageJsonPattern, communityTowerPackageJsonPattern],
    { cwd: towerSearchDir },
  );
  const externalTowerPackageNames = towerPackageJsonPaths.map(path.dirname);
  const externalTowersInfo = externalTowerPackageNames.map(
    towerPackageName => ({
      id: getTowerId(towerPackageName),
      requirePath: resolve.sync(towerPackageName, { basedir: towerSearchDir }),
    }),
  );

  return uniqBy(internalTowersInfo.concat(externalTowersInfo), 'id').map(
    ({ id, requirePath }) => {
      const { name, description, levels } = require(requirePath); // eslint-disable-line global-require, import/no-dynamic-require
      return new Tower(id, name, description, levels);
    },
  );
}

export default loadTowers;
