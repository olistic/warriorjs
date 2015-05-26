import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import ejs from 'ejs';
import Level from './Level';

class PlayerGenerator {
  constructor(level) {
    this._level = level;
  }

  getLevel() {
    return this._level;
  }

  getPreviousLevel() {
    this._previousLevel = this._previousLevel || new Level(this.getLevel().getProfile(), this.getLevel().getNumber() - 1);
    return this._previousLevel;
  }

  generate() {
    if (this.getLevel().getNumber() === 1) {
      if (!fs.existsSync(this.getLevel().getPlayerPath())) {
        fs.mkdirpSync(this.getLevel().getPlayerPath());
      }

      fs.copySync(path.join(this.getTemplatesPath(), 'Player.js'), path.join(this.getLevel().getPlayerPath(), 'Player.js'));
    }

    fs.writeFileSync(path.join(this.getLevel().getPlayerPath(), 'README'), this.readTemplate(path.join(this.getTemplatesPath(), 'README.ejs')));
  }

  getTemplatesPath() {
    return path.resolve(__dirname, '..', 'templates');
  }

  readTemplate(templatePath) {
    return ejs.render(fs.readFileSync(templatePath, 'utf8'), { level: this.getLevel(), chalk: chalk });
  }
}

export default PlayerGenerator;
