import chalk from 'chalk';

/**
 * Ask the user a message and expect a Y/n answer.
 * @param  {String}  message        Message displayed to the user
 * @param  {Boolean} standartAnswer If the user presses enter is this standart answer used
 * @return {Promise<Boolean>}       This promise is resolved once replied to the confirmation (Y: true, N: false)
 */
async function confirmation(message, standartAnswer = true) {
  const prompt = chalk.gray.dim('>');
  const question = chalk.green(message);
  const answer = `(${standartAnswer ? 'Y' : 'y'}/${
    standartAnswer ? 'n' : 'N'
  })`;

  const line = `${prompt} ${question} ${answer}`;
  this.element.pushLine(line);
  this.render();

  const yes = ['S-y', 'y'];
  const no = ['S-n', 'n'];
  const standart = ['enter'];

  const key = await this.awaitKeyInput([...yes, ...no, ...standart]);

  let result = standartAnswer;

  if (yes.includes(key)) {
    result = true;
  }

  if (no.includes(key)) {
    result = false;
  }

  const finalLine = `${prompt} ${question} ${answer}: ${result ? 'Y' : 'N'}`;

  this.element.popLine();
  this.element.pushLine(finalLine);
  this.render();

  return result;
}

export default confirmation;
