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

  initDOM() {
    // eslint-disable-next-line no-restricted-syntax
    for (const element in this.DOM) {
      if (this.DOM[element]) {
        const options = this.DOM[element] || {};
        this.elements[element] = blessed.box(options);
        this.screen.append(this.elements[element]);
      }
    }
  }

  get(name) {
    return this.elements[name];
  }

  select(name) {
    if (!this.elements[name]) {
      return undefined;
    }

    const element = this.elements[name];

    const handle = (source = {}, scope, modifier) =>
      new Proxy(source, {
        get: (target, key) => {
          if (!target[key]) {
            return undefined;
          }

          return async (...args) => {
            if (this.DOM[name].beforeNewLine)
              this.DOM[name].beforeNewLine(element);

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

            if (this.DOM[name].afterNewLine)
              this.DOM[name].afterNewLine(element);

            this.render();
            return response;
          };
        },
      });

    return {
      set: handle(this.DOM[name].components, this, 'setContent'),
      push: handle(this.DOM[name].components, this, 'pushLine'),
      preform: handle(
        this.DOM[name].preform,
        Object.assign(this, {
          element: this.elements[name],
        }),
      ),
    };
  }
}
