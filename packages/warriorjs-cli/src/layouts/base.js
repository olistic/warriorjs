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
      tput: true,
      dump: `${__dirname}/logs/prompt.log`,
      autoPadding: true,
      warnings: true,
    });
  }

  listenEscape(keys = ['escape', 'C-c']) {
    this.screen.key(keys, () => {
      this.screen.destroy();
    });
  }

  async awaitKeyInput(keys) {
    return new Promise(resolve => {
      this.screen.key(keys, resolve);
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

          return (...args) => {
            let res = target[key].apply(scope, args);

            if (!res) {
              return;
            }

            if (this.boxes[box].beforeNewLine)
              this.boxes[box].beforeNewLine(element);

            if (!Array.isArray(res)) {
              res = [res];
            }

            if (modifier) {
              element[modifier](...res);
            }

            if (this.boxes[box].afterNewLine)
              this.boxes[box].afterNewLine(element);
          };
        },
      });

    return {
      set: handle(this.boxes[box].modify, this, 'setContent'),
      push: handle(this.boxes[box].modify, this, 'pushLine'),
      preform: handle(this.boxes[box].preform, {
        ...this,
        box: this.boxes[box],
      }),
    };
  }
}
