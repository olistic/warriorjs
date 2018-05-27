import sleep from 'delay';
import { runLevel } from '@warriorjs/core';

import LevelUI from './layouts/level';
import getLevelConfig from './utils/getLevelConfig';

export default class Level {
  constructor(levelNumber, profile, tower, delay) {
    this.ui = new LevelUI();
    this.profile = profile;
    this.tower = tower;
    this.delay = delay;
    this.result = null;
    this.levelNumber = levelNumber;
    this.levelConfig = getLevelConfig(levelNumber, tower, profile);
  }

  async run() {
    const header = this.ui.select('header');
    await header.set.levelHeader(this.levelNumber);

    const playerCode = await this.profile.readPlayerCode();
    const result = await runLevel(this.levelConfig, playerCode);

    this.result = result;

    // FIXME: break for loop if player quits before end of events
    if (!this.silencePlay) {
      await this.printEvents(result.events);
    }

    return result.passed;
  }

  async printEvents(events) {
    const status = this.ui.select('status');
    const floorMap = this.ui.select('floorMap');
    const log = this.ui.select('log');

    let turnNumber = 1;

    // eslint-disable-next-line no-restricted-syntax
    for (const event of events) {
      /* eslint-disable no-await-in-loop */
      await log.push.eventMessage(event, turnNumber);
      await floorMap.set.floorMap(event.floor.map);
      await status.set.warriorStatus(event.floor.warrior);
      /* eslint-enable no-await-in-loop */

      switch (event.type) {
        case 'TURN':
          turnNumber += 1;
          break;
        case 'UNIT': {
          await sleep(this.delay); // eslint-disable-line no-await-in-loop
          break;
        }
        default:
          break;
      }
    }
  }

  async printResult() {
    const log = this.ui.select('log');
    const { passed, score } = this.result;

    await log.push.seperator();

    if (!passed) {
      await log.push.failure(
        `Sorry, you failed level ${
          this.levelNumber
        }. Change your script and try again.`,
      );

      await log.push.seperator();
      return;
    }

    const hasNextLevel = this.tower.hasLevel(this.levelNumber + 1);
    const { aceScore } = this.levelConfig;

    if (hasNextLevel) {
      await log.push.success('Success! You have found the stairs.');
    } else {
      await log.push.success(
        'CONGRATULATIONS! You have climbed to the top of the tower.',
      );
    }

    await log.push.levelReport(this.profile, score, aceScore);

    const { warriorScore, timeBonus, clearBonus } = score;
    const totalScore = warriorScore + timeBonus + clearBonus;

    this.profile.tallyPoints(this.levelNumber, totalScore, aceScore);

    if (this.profile.isEpic()) {
      if (!hasNextLevel && !this.practiceLevel) {
        await log.push.towerReport(this.profile);
      }
    }

    await log.push.seperator();
  }

  async giveClue() {
    const log = this.ui.select('log');

    if (this.levelConfig.clue && !this.profile.isShowingClue()) {
      const showClue = await log.preform.confirmation(
        `Would you like to read the additional clues for this level?`,
        true,
      );

      if (showClue) {
        await log.push.success(
          `See ${this.profile.getReadmeFilePath()} for the clues.`,
        );

        return true;
      }
    }

    return false;
  }

  async requestReplay() {
    const log = this.ui.select('log');
    await log.preform.wait(`Press enter to replay the level.`);
  }

  async notifyEpicNextLevel(delay) {
    const log = this.ui.select('log');
    await log.push.success(
      `Continuing to next level in ${delay / 1000} seconds.`,
    );
  }

  async requestNextLevelKey() {
    const log = this.ui.select('log');
    await log.preform.wait('Press enter to start the next level.');
  }

  async requestNextLevel() {
    const log = this.ui.select('log');

    if (this.profile.isEpic()) {
      return true;
    }

    const continueToNextLevel = await log.preform.confirmation(
      'Would you like to continue on to the next level?',
      true,
    );

    if (!continueToNextLevel) {
      await log.push.success(
        'Staying on current level. Try to earn more points next time.',
      );

      return false;
    }

    await log.push.success(
      `See ${this.profile.getReadmeFilePath()} for updated instructions.`,
    );

    return true;
  }

  destroy() {
    this.ui.destroy();
  }
}
