const towerIdRegex = /(?:@warriorjs\/|warriorjs-)tower-(.+)/;

function getTowerId(towerPackageName: string): string {
  return towerPackageName.match(towerIdRegex)?.[1] ?? '';
}

export default getTowerId;
