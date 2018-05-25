import sleep from 'delay';

import BaseLayout from './base';
import constructLevelHeader from '../ui/constructLevelHeader';
import constructFloorMap from '../ui/constructFloorMap';
import constructTurnHeader from '../ui/constructTurnHeader';
import constructLogMessage from '../ui/constructLogMessage';
import constructWarriorStatus from '../ui/constructWarriorStatus';

export default class LevelLayout extends BaseLayout {
  constructor() {
    super();

    this.boxes = {
      header: {
        top: 0,
        left: 0,
        height: 1,
        tags: true,
      },
      status: {
        top: 1,
        left: 0,
        height: 2,
        tags: true,
      },
      floorMap: {
        top: 3,
        left: 0,
        height: 3,
        tags: true,
      },
      log: {
        bottom: 0,
        left: 0,
        height: '100%-6',
        tags: true,
        keys: true,
        vi: true,
        alwaysScroll: true,
        scrollable: true,
        scrollbar: {
          bg: 'gray',
        },
      },
    };

    this.initBoxes();
    this.listenEscape();
  }

  setHeader(levelNumber) {
    const content = constructLevelHeader(this.screen.width, levelNumber);
    const header = this.get('header');

    header.setContent(content);
  }

  setFloorMap(map) {
    const content = constructFloorMap(map);
    const floorMap = this.get('floorMap');

    floorMap.setContent(content);
  }

  setWarriorStatus(warrior) {
    const content = constructWarriorStatus(warrior);
    const status = this.get('status');

    status.setContent(content);
  }

  async printEvents(events, delay) {
    const log = this.get('log');
    let turnNumber = 1;
    log.focus();

    // eslint-disable-next-line no-restricted-syntax
    for (const event of events) {
      let line = null;

      const { type } = event;
      switch (type) {
        case 'TURN':
          line = constructTurnHeader(this.screen.width, turnNumber);

          turnNumber += 1;
          break;
        case 'UNIT': {
          const { message } = event;
          if (message) {
            line = constructLogMessage(event.unit, message);
          }

          break;
        }
        default:
          break;
      }

      this.setFloorMap(event.floor.map);
      this.setWarriorStatus(event.floor.warrior);

      if (line) {
        log.pushLine(line);
        log.setScrollPerc(100);
      }

      this.render();

      await sleep(delay); // eslint-disable-line no-await-in-loop
    }
  }
}
