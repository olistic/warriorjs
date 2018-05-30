const towerIdRegex = /(?:@warriorjs\/|warriorjs-)tower-(.+)/;

/**
 * Returns the identifier of the tower based on the package name.
 *
 * @param {string} towerPackageName The package name of the tower.
 */
function getTowerId(towerPackageName) {
  return towerPackageName.match(towerIdRegex)[1];
}

export default getTowerId;
