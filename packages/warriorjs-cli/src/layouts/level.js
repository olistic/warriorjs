import BaseLayout from './base';

import floorMap from './lines/floorMap';
import levelHeader from './lines/levelHeader';
import warriorStatus from './lines/warriorStatus';
import seperator from './lines/seperator';
import eventMessage from './lines/eventMessage';
import success from './lines/success';
import failure from './lines/failure';
import totalScore from './lines/totalScore';
import levelReport from './lines/levelReport';
import towerReport from './lines/towerReport';

export default class LevelLayout extends BaseLayout {
  constructor() {
    super();

    this.boxes = {
      header: {
        top: 0,
        left: 0,
        height: 1,
        tags: true,
        methods: {
          levelHeader,
        },
      },
      status: {
        top: 1,
        left: 0,
        height: 2,
        tags: true,
        methods: {
          warriorStatus,
        },
      },
      floorMap: {
        top: 3,
        left: 0,
        height: 3,
        tags: true,
        methods: {
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
          bg: 'gray',
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
      },
    };

    this.initBoxes();
    this.listenEscape();
  }
}
