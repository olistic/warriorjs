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
      const choices = items.map(item => (
        {
          name: item.toString(),
          value: item,
        }
      ));

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

  static printPlay(initialFloor, events) {
    let offset = 0;
    let lastFloor = initialFloor;

    return Promise.reduce(events, (_, event) => {
      switch (event.type) {
        case 'TURN_CHANGED':
          offset = 0;
          UI.printLine(`-------------------------- turn ${event.turn} --------------------------`);
          return UI.printFloor(lastFloor, offset);
        case 'UNIT_SPOKE': {
          offset += 1;
          const { unitType, message } = event;
          return UI.printLineWithDelay(UI.getUnitStyle(unitType)(message));
        }
        case 'FLOOR_CHANGED':
          lastFloor = event.floor;
          return UI.printFloor(lastFloor, offset);
        default:
          return Promise.resolve(true);
      }
    }, null);
  }

  static printFloor(floor, offset) {
    if (offset) {
      Config.outStream.write(`\x1B[${offset + floor.size.height + 2}A`);
    }

    return UI.printLineWithDelay(UI.getFloorCharacter(floor))
      .then(() => {
        if (offset) {
          Config.outStream.write(`\x1B[${offset}B`);
        }
      });
  }

  static getFloorCharacter({ size, stairs, warrior, units }, styled = true) {
    const rows = [];
    rows.push(`╔${'═'.repeat(size.width)}╗`);
    for (let y = 0; y < size.height; y++) {
      let row = '║';
      for (let x = 0; x < size.width; x++) {
        const foundUnit = units.find(unit => unit.x === x && unit.y === y);
        if (foundUnit) {
          row += UI.getUnitStyle(foundUnit.type)(UI.getUnitCharacter(foundUnit.type));
        } else if (warrior && warrior.x === x && warrior.y === y) {
          row += UI.getUnitStyle('warrior')(UI.getUnitCharacter('warrior'));
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

    const floorCharacter = rows.join('\n');
    return styled ? floorCharacter : chalk.stripColor(floorCharacter);
  }

  static getUnitCharacter(type) {
    return UNIT_TYPE_CHARACTERS[type];
  }

  static getUnitStyle(type) {
    return UNIT_TYPE_STYLES[type];
  }
}

export default UI;
