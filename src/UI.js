import chalk from 'chalk';
import inquirer from 'inquirer';
import Promise from 'bluebird';
import Config from './Config';

const UNIT_TYPE_CHARACTERS = {
  archer: 'a',
  captive: 'C',
  sludge: 's',
  thickSludge: 'S',
  warrior: '@',
  wizard: 'w',
};

const UNIT_TYPE_STYLES = {
  archer: chalk.yellow,
  captive: chalk.magenta,
  sludge: chalk.green,
  thickSludge: chalk.green,
  warrior: chalk.cyan,
  wizard: chalk.blue,
};

class UI {
  static print(message) {
    if (Config.getOutStream()) {
      Config.getOutStream().write(message);
    }
  }

  static printLine(message) {
    UI.print(`${message}\n`);
  }

  static printLineWithDelay(message) {
    return new Promise((resolve) => {
      UI.printLine(message);
      setTimeout(resolve, Config.getDelay() * 1000);
    });
  }

  /*
   * Inquire
   */

  static request(message) {
    return new Promise((resolve) => {
      const name = 'request';
      inquirer.prompt([
        {
          name,
          message,
          type: 'input',
        },
      ], (answers) => {
        resolve(answers[name]);
      });
    });
  }

  static ask(message, defaultAnswer = true) {
    return new Promise((resolve) => {
      const name = 'confirmation';
      inquirer.prompt([
        {
          name,
          message,
          type: 'confirm',
          default: defaultAnswer,
        },
      ], (answers) => {
        resolve(answers[name]);
      });
    });
  }

  static choose(itemName, items) {
    return new Promise((resolve) => {
      const choices = items.map((item) => {
        return {
          name: item.toString(),
          value: item,
        };
      });

      const name = 'choice';
      inquirer.prompt([
        {
          name,
          choices,
          type: 'list',
          message: `Choose ${itemName}:`,
        },
      ], (answers) => {
        resolve(answers[name]);
      });
    });
  }

  /*
   * Graphics
   */

  static printTrace(trace) {
    return Promise.reduce(trace, (_, turn) => {
      UI.printLine(`-------------------------- turn ${turn.turnNumber} --------------------------`);
      return UI.printFloor(turn.floor).then(() => UI.printLog(turn.log));
    }, null);
  }

  static printFloor(floor) {
    const floorCharacter = UI.getFloorCharacter(floor.width, floor.height, floor.stairsLocation, floor.units);
    return UI.printLineWithDelay(floorCharacter);
  }

  static printLog(log) {
    return Promise.reduce(log, (_, entry) => {
      UI.printLineWithDelay(UNIT_TYPE_STYLES[entry.unitType](entry.message));
    }, null);
  }

  static getFloorCharacter(width, height, stairsLocation, units) {
    const rows = [];
    rows.push(`╔${'═'.repeat(width)}╗`);
    for (let y = 0; y < height; y++) {
      let row = '║';
      for (let x = 0; x < width; x++) {
        const foundUnit = units.find((unit) => unit.position.x === x && unit.position.y === y); // eslint-disable-line no-loop-func
        if (foundUnit) {
          row += UI.getUnitStyle(foundUnit.type)(UI.getUnitCharacter(foundUnit.type));
        } else if (stairsLocation[0] === x && stairsLocation[1] === y) {
          row += '>';
        } else {
          row += ' ';
        }
      }

      row += '║';
      rows.push(row);
    }

    rows.push(`╚${'═'.repeat(width)}╝`);
    return rows.join('\n');
  }

  static getUnitCharacter(type) {
    return UNIT_TYPE_CHARACTERS[type];
  }

  static getUnitStyle(type) {
    return UNIT_TYPE_STYLES[type];
  }
}

export default UI;
