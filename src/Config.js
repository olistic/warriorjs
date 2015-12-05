export default class Config {
  static get pathPrefix() {
    return this._pathPrefix || '.';
  }

  static set pathPrefix(path) {
    this._pathPrefix = path;
  }

  static get skipInput() {
    return this._skipInput;
  }

  static set skipInput(skip) {
    this._skipInput = skip;
  }

  static get delay() {
    return this._delay || 0.6;
  }

  static set delay(delay) {
    this._delay = delay;
  }

  static get inStream() {
    return this._inStream;
  }

  static set inStream(stream) {
    this._inStream = stream;
  }

  static get outStream() {
    return this._outStream;
  }

  static set outStream(stream) {
    this._outStream = stream;
  }

  static get practiceLevel() {
    return this._practiceLevel;
  }

  static set practiceLevel(practiceLevel) {
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
