import blessed from 'blessed';

/* eslint-disable no-underscore-dangle */
export default class BaseLayout {
  constructor() {
    this._boxes = {};
    this.createScreen();
  }

  createScreen() {
    this.screen = blessed.screen({
      smartCSR: true,
    });
  }

  listenEscape(keys = ['escape', 'q', 'C-c']) {
    this.screen.key(keys, () => {
      this.screen.destroy();
    });
  }

  render() {
    this.screen.render();
  }

  append() {
    // eslint-disable-next-line no-restricted-syntax
    for (const box in this.boxes) {
      if (this.boxes[box]) {
        const options = this.layout[box] || {};
        this._boxes[box] = blessed.box(options);
        this.screen.append(this._boxes[box]);
      }
    }
  }

  get(box) {
    return this._boxes[box];
  }
}
