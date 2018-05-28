import chalk from 'chalk';

/**
 * Wait till one of the given keys is pressed.
 * @param  {String} message Message displayed to the user
 * @param  {Array}  keys    Array of keys that can be pressed
 * @return {Promise}        This promise is resolved once one of the given keys is pressed
 */
async function wait(message, keys = ['enter']) {
  const prompt = chalk.gray.dim('>');

  const line = `${prompt} ${chalk.green(message)}`;
  this.element.pushLine(line);
  this.element.setScrollPerc(100);
  this.render();

  await this.awaitKeyInput(keys);
}

export default wait;
