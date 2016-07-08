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

export default class UI {
  static print(message) {
    if (Config.outStream) {
      Config.outStream.write(message);
    }
  }

  static printLine(message) {
    UI.print(`${message}\n`);
  }

  static printLineWithDelay(message) {
    UI.printLine(message);
    const ms = Config.delay * 1000;
    return Promise.delay(ms);
  }

  /*
   * Inquire
   */

  static request(message) {
    const name = 'request';
    return inquirer.prompt([
      {
        name,
        message,
        type: 'input',
      },
    ]).then(answers => Promise.resolve(answers[name]));
  }

  static ask(message, defaultAnswer = true) {
    const name = 'confirmation';
    return inquirer.prompt([
      {
        name,
        message,
        type: 'confirm',
        default: defaultAnswer,
      },
    ]).then(answers => Promise.resolve(answers[name]));
  }

  static choose(itemName, items) {
    const name = 'choice';
    const choices = items.map(item => ({
      name: item.toString(),
      value: item,
    }));

    return inquirer.prompt([
      {
        name,
        choices,
        type: 'list',
        message: `Choose ${itemName}:`,
      },
    ]).then(answers => Promise.resolve(answers[name]));
  }

  /*
   * Graphics
   */

  static printPlay(events) {
    let lastFloor;
    let offset = 0;

    return Promise.reduce(events, (_, event) => {
      switch (event.type) {
        case 'PLAY_STARTED':
          lastFloor = event.initialFloor;
          return Promise.resolve(true);
        case 'TURN_CHANGED': {
          offset = 0;
          const turnNumber = event.turn;
          return UI.printTurnHeader(turnNumber).then(() => UI.printFloor(lastFloor, offset));
        }
        case 'UNIT_SPOKE': {
          offset += 1;
          const { unitType, message } = event;
          return UI.printUnitMessage(unitType, message);
        }
        case 'FLOOR_CHANGED':
          lastFloor = event.floor;
          return UI.printFloor(lastFloor, offset);
        default:
          return Promise.resolve(true);
      }
    }, null);
  }

  static printTurnHeader(turnNumber) {
    return UI.printLineWithDelay(
      chalk.gray(`-------------------------- turn ${turnNumber} --------------------------`)
    );
  }

  static printUnitMessage(unitType, message) {
    return UI.printLineWithDelay(UI.getUnitStyle(unitType)(message));
  }

  static printFloor(floor, offset) {
    if (offset) {
      Config.outStream.write(`\x1B[${offset + floor.size.height + 2 + 1}A`);
    }

    const warriorHealth = (floor.warrior && floor.warrior.health) || 0;
    UI.printLine(chalk.red(`♥ ${String(warriorHealth).padRight(9, ' ')}`));

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
