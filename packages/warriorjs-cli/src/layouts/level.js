import BaseLayout from './base';

import floorMap from './modify/floorMap';
import levelHeader from './modify/levelHeader';
import warriorStatus from './modify/warriorStatus';
import seperator from './modify/seperator';
import eventMessage from './modify/eventMessage';
import success from './modify/success';
import failure from './modify/failure';
import totalScore from './modify/totalScore';
import levelReport from './modify/levelReport';
import towerReport from './modify/towerReport';

import confirmation from './preform/confirmation';
import wait from './preform/wait';

export default class LevelLayout extends BaseLayout {
  constructor() {
    super();

    this.DOM = {
      header: {
        top: 0,
        left: 0,
        height: 1,
        tags: true,
        modify: {
          levelHeader,
        },
      },
      status: {
        top: 1,
        left: 0,
        height: 2,
        tags: true,
        modify: {
          warriorStatus,
        },
      },
      floorMap: {
        top: 3,
        left: 0,
        height: 3,
        tags: true,
        modify: {
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
        methods: {
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
