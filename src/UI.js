import inquirer from 'inquirer';
import Promise from 'bluebird';
import Config from './Config';

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

  static request(message) {
    return new Promise((resolve) => {
      const name = 'request';
      inquirer.prompt([
        {
          type: 'input',
          name: name,
          message: message,
        },
      ], (answers) => {
        resolve(answers[name]);
      });
    });
  }

  static ask(message) {
    return new Promise((resolve) => {
      const name = 'confirmation';
      inquirer.prompt([
        {
          type: 'confirm',
          name: name,
          message: message,
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
          type: 'list',
          name: name,
          message: `Choose ${itemName}:`,
          choices: choices,
        },
      ], (answers) => {
        resolve(answers[name]);
      });
    });
  }
}

export default UI;
