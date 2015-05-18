import _ from 'lodash';
import readlineSync from 'readline-sync';
import sleep from 'thread-sleep';
import Config from './Config';

class UI {
  static printLine(msg) {
    if (Config.getOutStream()) {
      Config.getOutStream().write(`${msg}\n`);
    }
  }

  static printLineWithDelay(msg) {
    if (Config.getDelay()) {
      sleep(Config.getDelay() * 1000);
    }

    UI.printLine(msg);
  }

  static print(msg) {
    if (Config.getOutStream()) {
      Config.getOutStream().write(msg);
    }
  }

  static request(msg) {
    return readlineSync.question(msg);
  }

  static ask(msg) {
    return readlineSync.keyInYNStrict(msg);
  }

  static choose(itemName, items) {
    let response;
    if (items.length === 1) {
      response = items[0];
    } else {
      const itemsNames = items.map((item) => (Array.isArray(item) ? _.last(item) : item).toString());
      const choice = readlineSync.keyInSelect(itemsNames, `Choose ${itemName} by typing the number: `, { guide: false, cancel: false });
      response = items[choice];
    }

    if (Array.isArray(response)) {
      return _.first(response);
    }

    return response;
  }
}

export default UI;
