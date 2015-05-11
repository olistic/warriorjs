import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import System from 'systemjs';
import LevelLoader from './LevelLoader';
import PlayerGenerator from './PlayerGenerator';
import UI from './UI';

class Level {
  constructor(profile, number) {
    this._profile = profile;
    this._number = number;
    this._timeBonus = 0;
  }

  getProfile() {
    return this._profile;
  }

  getNumber() {
    return this._number;
  }

  getDescription() {
    return this._description;
  }

  setDescription(desc) {
    this._description = desc;
  }

  getTip() {
    return this._tip;
  }

  setTip(tip) {
    this._tip = tip;
  }

  getClue() {
    return this._clue;
  }

  setClue(clue) {
    this._clue = clue;
  }

  getWarrior() {
    return this._warrior;
  }

  setWarrior(warrior) {
    this._warrior = warrior;
  }

  getFloor() {
    return this._floor;
  }

  setFloor(floor) {
    this._floor = floor;
  }

  getTimeBonus() {
    return this._timeBonus;
  }

  setTimeBonus(timeBonus) {
    this._timeBonus = timeBonus;
  }

  getPlayerPath() {
    return this._profile.getPlayerPath();
  }

  loadLevel() {
    new LevelLoader(this).load();
  }

  getLoadPath() {
    return path.join(
      path.resolve(__dirname, '..', 'towers'),
      path.basename(this.getProfile().getTowerPath()),
      `level${_.padLeft(this._number, 3, '0')}.json`
    );
  }

  loadPlayer() {
    // TODO: transpile source before eval
    // eval(fs.readFileSync(path.join(this.getPlayerPath(), 'Player.js'), 'utf8'));
    // eval(babel.transformFileSync(path.join(this.getPlayerPath(), 'Player.js').code));
  }

  generatePlayerFiles() {
    this.loadLevel();
    new PlayerGenerator(this).generate();
  }

  play(turns = 1000) {
    this.loadLevel();
    for (let n = 0; n < turns; n++) {
      if (this.passed() || this.failed()) {
        return;
      }

      UI.printLine(`- turn ${n + 1} -`);
      UI.print(this.getFloor().getCharacter());
      this.getFloor().getUnits().forEach((unit) => unit.prepareTurn());
      this.getFloor().getUnits().forEach((unit) => unit.performTurn());
      // yield if block_given?
      if (this.getTimeBonus() > 0) {
        this.setTimeBonus(this.getTimeBonus() - 1);
      }
    }
  }

  tallyPoints() {
    let score = 0;

    UI.printLine(`Level Score: ${this.getWarrior().getScore()}`);
    score += this.getWarrior().getScore();

    UI.printLine(`Time Bonus: ${this.getTimeBonus()}`);
    score += this.getTimeBonus();

    if (!this.getFloor().getOtherUnits().length) {
      UI.printLine(`Clear Bonus: ${this.getClearBonus()}`);
      score += this.getClearBonus();
    }

    UI.printLine(`Total Score: ${this.scoreCalculation(this._profile.getScore(), score)}`);
    this.getProfile().setScore(this.getProfile().getScore() + score);
    this.getProfile().setActions(Object.keys(this.getWarrior().getActions()));
    this.getProfile().setSenses(Object.keys(this.getWarrior().getSenses()));
  }

  getClearBonus() {
    return Math.round((this.getWarrior().getScore() + this.getTimeBonus()) * 0.2);
  }

  scoreCalculation(currentScore, addition) {
    if (currentScore === 0) {
      return addition.toString();
    }

    return `${currentScore} + ${addition} = ${currentScore + addition}`;
  }

  passed() {
    return this.getFloor().getStairsSpace().isWarrior();
  }

  failed() {
    return !this.getFloor().getUnits().includes(this.getWarrior());
  }

  exists() {
    return fs.existsSync(this.getLoadPath());
  }

  setupWarrior(warrior) {
    this._warrior = warrior;
    this._warrior.addActions(this.getProfile().getActions());
    this._warrior.setName(this.getProfile().getWarriorName());
    return this._warrior;
  }
}

export default Level;
