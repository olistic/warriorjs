import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import * as babel from 'babel';
import LevelLoader from './LevelLoader';
import PlayerGenerator from './PlayerGenerator';
import UI from './UI';

class Level {
  static getGradeLetter(percent) {
    if (percent >= 1.0) {
      return 'S';
    } else if (percent >= 0.9) {
      return 'A';
    } else if (percent >= 0.8) {
      return 'B';
    } else if (percent >= 0.7) {
      return 'C';
    } else if (percent >= 0.6) {
      return 'D';
    }

    return 'F';
  }

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

  decTimeBonus() {
    this._timeBonus -= 1;
  }

  getAceScore() {
    return this._aceScore;
  }

  setAceScore(aceScore) {
    this._aceScore = aceScore;
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
    eval(babel.transformFileSync(path.join(this.getPlayerPath(), 'Player.js')).code);
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
      UI.printLineWithDelay(this.getFloor().getCharacter());
      this.getFloor().getUnits().forEach((unit) => unit.prepareTurn());
      this.getFloor().getUnits().forEach((unit) => unit.performTurn());
      if (this.getTimeBonus() > 0) {
        this.decTimeBonus();
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

    if (this.getProfile().isEpic()) {
      if (this.getGradeFor(score)) {
        UI.printLine(`Level Grade: ${this.getGradeFor(score)}`);
      }

      UI.printLine(`Total Score: ${this.scoreCalculation(this._profile.getCurrentEpicScore(), score)}`);
      if (this.getAceScore()) {
        this.getProfile().getCurrentEpicGrades()[this._number] = (score * 1.0 / this.getAceScore());
      }

      this.getProfile().addCurrentEpicScore(score);
    } else {
      UI.printLine(`Total Score: ${this.scoreCalculation(this._profile.getScore(), score)}`);
      this.getProfile().addScore(score);
      this.getProfile().setActions(Object.keys(this.getWarrior().getActions()));
      this.getProfile().setSenses(Object.keys(this.getWarrior().getSenses()));
    }
  }

  getGradeFor(score) {
    if (this.getAceScore()) {
      return Level.getGradeLetter(score * 1.0 / this.getAceScore());
    }

    return null;
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
    this._warrior.addSenses(this.getProfile().getSenses());
    this._warrior.setName(this.getProfile().getWarriorName());
    return this._warrior;
  }
}

export default Level;
