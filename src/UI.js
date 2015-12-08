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
    if (Config.outStream) {
      Config.outStream.write(message);
    }
  }

  static printLine(message) {
    UI.print(`${message}\n`);
  }

  static printLineWithDelay(message) {
    return new Promise((resolve) => {
      UI.printLine(message);
      setTimeout(resolve, Config.delay * 1000);
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

  static printPlay(trace) {
    let turnNumber = 1;
    return Promise.reduce(trace, (_, turn) => {
      UI.printLine(`-------------------------- turn ${turnNumber} --------------------------`);

      let y = 0;

      let stepNumber = 1;

      return Promise.reduce(turn, (_, step) => { // eslint-disable-line no-shadow
        const { initialFloor, log, finalFloor } = step;

        UI.printFloor(initialFloor, y);
        return Promise.delay(stepNumber === 1 ? Config.delay * 1000 : 0)
          .then(() => UI.printLog(log))
          .then(() => y += log.length)
          .then(() => UI.printFloor(finalFloor, y))
          .then(() => Promise.delay(stepNumber === turn.length ? Config.delay * 1000 : 0))
          .then(() => stepNumber += 1);
      }, null).then(() => turnNumber += 1);
    }, null);
  }

  static printFloor(floor, y) {
    if (y) {
      Config.outStream.write(`\x1B[${y + floor.size.height + 2}A`);
    }

    UI.printLine(UI.getFloorCharacter(floor));

    if (y) {
      Config.outStream.write(`\x1B[${y}B`);
    }
  }

  static printLog(log) {
    return Promise.reduce(log, (_, entry) => {
      const { unitType, message } = entry;
      return UI.printLineWithDelay(UI.getUnitStyle(unitType)(message));
    }, null);
  }

  static getFloorCharacter({ size, stairs, units }, styled = true) {
    const rows = [];
    rows.push(`╔${'═'.repeat(size.width)}╗`);
    for (let y = 0; y < size.height; y++) {
      let row = '║';
      for (let x = 0; x < size.width; x++) {
        const foundUnit = units.find((unit) => unit.x === x && unit.y === y); // eslint-disable-line no-loop-func
        if (foundUnit) {
          row += styled ?
            UI.getUnitStyle(foundUnit.type)(UI.getUnitCharacter(foundUnit.type)) :
            UI.getUnitCharacter(foundUnit.type);
        } else if (stairs.x === x && stairs.y === y) {
          row += '>';
        } else {
          row += ' ';
        }
      }

      row += '║';
      rows.push(row);
    }

    rows.push(`╚${'═'.repeat(size.width)}╝`);
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
