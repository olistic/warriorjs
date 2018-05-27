import chalk from 'chalk';

async function wait(message, keys = ['enter']) {
  const prompt = chalk.gray.dim('>');

  const line = `${prompt} ${chalk.green(message)}`;
  this.element.pushLine(line);
  this.render();

  await this.awaitKeyInput(keys);
}

export default wait;
