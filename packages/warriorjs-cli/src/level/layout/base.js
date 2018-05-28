import blessed from 'blessed';
import handleFunction from '../../utils/handleFunction';

export default class BaseLayout {
  constructor() {
    this.elements = {};
    this.createScreen();
  }

  /**
   * Initialize a new blessed screen and set it to this class.
   */
  createScreen() {
    this.screen = blessed.screen({
      smartCSR: true,
      tput: true,
      autoPadding: true,
      warnings: true,
    });
  }

  /**
   * Destroy the current layout
   */
  destroy() {
    if (this.screen) this.screen.destroy();
  }

  /**
   * Destroy the layout once one of the given keys is
   * pressed. By default is this method listening to 'escape' and 'C-c' (control c)
   * @param  {Array}  keys   Array of keys you want to listen to by default is this variable set to ['escape', 'C-c']
   */
  listenEscape(keys = ['escape', 'C-c']) {
    this.screen.key(keys, () => {
      this.screen.destroy();
    });
  }

  /**
   * Wait till one of the given keys is pressed.
   * @param  {Array} keys  Array of keys that needs to be listened for
   * @return {Promise}     This promise is resolved once one of the given keys is pressed
   */
  async awaitKeyInput(keys) {
    return new Promise(resolve => {
      this.screen.onceKey(keys, resolve);
    });
  }

  /**
   * Render the layout
   */
  render() {
    this.screen.render();
  }

  /**
   * Initialize the layout with the set DOM.
   * This method will create box elements out of all DOM objects.
   */
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

  /**
   * Get the given element.
   * @param  {String}     name Name of the element
   * @return {undefined|BlessedBox}
   */
  get(name) {
    return this.elements[name];
  }

  /**
   * Select a element to preform a action. A object with 3 properties is returned.
   * set: set the content of the entire element
   * push: push one or more lines to the given element
   * preform: preform a action
   *
   * The methods availible in these properties are set when initializing the DOM.
   * set, push: use the components property of a element
   * preform: use the preform property of a element
   * @param  {String} name Name of the element
   * @return {Object}      Object with the following properties: set, push, preform
   */
  select(name) {
    if (!this.elements[name]) {
      return undefined;
    }

    const element = this.elements[name];

    /**
     * Create and return a new Proxy that tries to return the wanted
     * method when getting a key. The given scope is bound to the method once found.
     * @param  {Object}   source    Source that contains all availible methods
     * @param  {Object}   scope     Scope that needs to be bound to the method once found
     * @param  {Function} callback  This function is called after the method is completed
     * @return {Promise}            This promise is resolved once the method is completed
     */
    const handle = (source = {}, scope = {}, callback) =>
      new Proxy(source, {
        get: (target, key) => {
          if (!target[key]) {
            return undefined;
          }

          return async (...args) => {
            if (this.DOM[name].beforeNewLine)
              this.DOM[name].beforeNewLine(element);

            const response = await handleFunction(target[key], scope, args);

            if (callback) {
              callback(response);
            }

            if (this.DOM[name].afterNewLine)
              this.DOM[name].afterNewLine(element);

            this.render();
            return response;
          };
        },
      });

    return {
      set: handle(this.DOM[name].components, this, response => {
        if (response) element.setContent(response);
      }),
      push: handle(this.DOM[name].components, this, response => {
        if (response) element.pushLine(response);
      }),
      preform: handle(
        this.DOM[name].preform,
        Object.assign(this, {
          element: this.elements[name],
        }),
      ),
    };
  }
}
