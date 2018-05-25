import BaseLayout from './base';

export default class LevelLayout extends BaseLayout {
  constructor() {
    super();

    this.boxes = {
      title: {
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
      board: {
        top: 3,
        left: 0,
        height: 3,
        tags: true,
      },
      logs: {
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
}
