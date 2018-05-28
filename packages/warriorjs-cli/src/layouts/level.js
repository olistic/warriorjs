import BaseLayout from './base';

import floorMap from './components/floorMap';
import levelHeader from './components/levelHeader';
import warriorStatus from './components/warriorStatus';
import seperator from './components/seperator';
import eventMessage from './components/eventMessage';
import success from './components/success';
import failure from './components/failure';
import totalScore from './components/totalScore';
import levelReport from './components/levelReport';
import towerReport from './components/towerReport';

import confirmation from './preform/confirmation';
import wait from './preform/wait';

/**
 * Level layout that is used when running a level.
 */
export default class LevelLayout extends BaseLayout {
  constructor() {
    super();

    this.DOM = {
      header: {
        top: 0,
        left: 0,
        height: 1,
        tags: true,
        components: {
          levelHeader,
        },
      },
      status: {
        top: 1,
        left: 0,
        height: 2,
        tags: true,
        components: {
          warriorStatus,
        },
      },
      floorMap: {
        top: 3,
        left: 0,
        height: 3,
        tags: true,
        components: {
          floorMap,
        },
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
          bg: 'white',
          track: {
            bg: 'grey',
          },
        },
        components: {
          seperator,
          eventMessage,
          success,
          failure,
          levelReport,
          totalScore,
          towerReport,
        },
        preform: {
          confirmation,
          wait,
        },
        afterNewLine(element) {
          element.setScrollPerc(100);
        },
      },
    };

    this.initDOM();
    this.listenEscape();
    this.elements.log.focus();
  }
}
