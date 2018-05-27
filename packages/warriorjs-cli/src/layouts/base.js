import blessed from 'blessed';
import handleFunction from '../utils/handleFunction';

export default class BaseLayout {
  constructor() {
    this.elements = {};
    this.createScreen();
  }

  createScreen() {
    this.screen = blessed.screen({
      smartCSR: true,
      tput: true,
      autoPadding: true,
      warnings: true,
    });
  }

  destroy() {
    if (this.screen) this.screen.destroy();
  }

  listenEscape(keys = ['escape', 'C-c']) {
    this.screen.key(keys, () => {
      this.screen.destroy();
    });
  }

  async awaitKeyInput(keys) {
    return new Promise(resolve => {
      this.screen.onceKey(keys, resolve);
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
    return this.elements[box];
  }

  select(box) {
    if (!this.elements[box]) {
      return undefined;
    }

    const element = this.elements[box];

    const handle = (source = {}, scope, modifier) =>
      new Proxy(source, {
        get: (target, key) => {
          if (!target[key]) {
            return undefined;
          }

          return async (...args) => {
            if (this.boxes[box].beforeNewLine)
              this.boxes[box].beforeNewLine(element);

            const response = await handleFunction(target[key], scope, args);

            if (response) {
              let payload = response;
              if (!Array.isArray(payload)) {
                payload = [payload];
              }

              if (modifier) {
                element[modifier](...payload);
              }
            }

            if (this.boxes[box].afterNewLine)
              this.boxes[box].afterNewLine(element);

            this.render();
            return response;
          };
        },
      });

    return {
      set: handle(this.boxes[box].modify, this, 'setContent'),
      push: handle(this.boxes[box].modify, this, 'pushLine'),
      preform: handle(
        this.boxes[box].preform,
        Object.assign(this, {
          element: this.elements[box],
        }),
      ),
    };
  }
}
