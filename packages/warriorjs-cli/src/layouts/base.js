import blessed from 'blessed';

/* eslint-disable no-underscore-dangle */
export default class BaseLayout {
  constructor() {
    this.elements = {};
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

  initBoxes() {
    // eslint-disable-next-line no-restricted-syntax
    for (const box in this.boxes) {
      if (this.boxes[box]) {
        const options = this.boxes[box] || {};
        this.elements[box] = blessed.box(options);
        this.screen.append(this.elements[box]);
      }
    }
  }

  get(box) {
    if (!this.elements[box] || !this.boxes[box].methods) {
      return undefined;
    }

    const element = this.elements[box];

    const proxy = method =>
      new Proxy(this.boxes[box].methods, {
        get: (target, key) => {
          if (!target[key]) {
            return undefined;
          }

          return (...args) => {
            let res = target[key].apply(this, args);
            if (!Array.isArray(res)) {
              res = [res];
            }

            method.apply(element, res);
          };
        },
      });

    return {
      set: proxy(element.setContent),
      push: proxy(element.pushLine),
    };
  }
}
