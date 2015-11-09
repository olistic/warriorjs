class Config {
  static getPathPrefix() {
    return this._pathPrefix || '.';
  }

  static setPathPrefix(path) {
    this._pathPrefix = path;
  }

  static getSkipInput() {
    return this._skipInput;
  }

  static setSkipInput(skip) {
    this._skipInput = skip;
  }

  static getDelay() {
    return this._delay || 0.6;
  }

  static setDelay(delay) {
    this._delay = delay;
  }

  static getInStream() {
    return this._inStream;
  }

  static setInStream(stream) {
    this._inStream = stream;
  }

  static getOutStream() {
    return this._outStream;
  }

  static setOutStream(stream) {
    this._outStream = stream;
  }

  static getPracticeLevel() {
    return this._practiceLevel;
  }

  static setPracticeLevel(practiceLevel) {
    this._practiceLevel = practiceLevel;
  }

  static reset() {
    ['_pathPrefix', '_skipInput', '_delay', '_inStream', '_outStream', '_practiceLevel'].forEach((prop) => {
      if (this.hasOwnProperty(prop)) {
        delete this[prop];
      }
    });
  }
}

export default Config;
