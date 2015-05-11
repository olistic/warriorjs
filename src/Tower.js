import path from 'path';

class Tower {
  constructor(towerPath) {
    this._path = towerPath;
  }

  getPath() {
    return this._path;
  }

  getName() {
    return path.basename(this.getPath());
  }

  toString() {
    return this.getName();
  }
}

export default Tower;
