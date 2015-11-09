import path from 'path';
import fs from 'fs-extra';
import ejs from 'ejs';
import Promise from 'bluebird';

class PlayerGenerator {
  _profile;
  _level;

  constructor(profile, level) {
    this._profile = profile;
    this._level = level;
  }

  generate() {
    return Promise.join(this.generatePlayer(), this.generateReadme());
  }

  generatePlayer() {
    if (this._profile.getLevelNumber() === 1) {
      return fs.ensureDirAsync(this._profile.getPlayerPath())
        .then(() => fs.copyAsync(path.join(this.getTemplatesPath(), 'Player.js'), path.join(this._profile.getPlayerPath(), 'Player.js')));
    }

    return Promise.resolve();
  }

  generateReadme() {
    return this.readTemplate(path.join(this.getTemplatesPath(), 'README.ejs'))
      .then((renderedReadme) => fs.writeFileAsync(path.join(this._profile.getPlayerPath(), 'README'), renderedReadme));
  }

  getTemplatesPath() {
    return path.resolve(__dirname, '..', 'templates');
  }

  readTemplate(templatePath) {
    return fs.readFileAsync(templatePath, 'utf8')
      .then((template) => {
        return Promise.resolve(ejs.render(template, { level: this._level }));
      });
  }
}

export default PlayerGenerator;
