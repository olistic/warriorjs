import path from 'path';

export default class Tower {
  constructor(towerPath) {
    this._path = towerPath;
  }

  get path() {
    return this._path;
  }

  get name() {
    return path.basename(this.path);
  }

  toString() {
    return this.name;
  }
}
