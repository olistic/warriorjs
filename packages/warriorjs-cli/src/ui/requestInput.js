import inquirer from 'inquirer';

inquirer.registerPrompt('suggest', require('inquirer-prompt-suggest'));

/**
 * Requests input from the user.
 *
 * @param {string} message The prompt message.
 * @param {string[]} suggestions The input suggestions.
 */
async function requestInput(message, suggestions = []) {
  const answerName = 'requestInput';
  const answers = await inquirer.prompt([
    {
      message,
      suggestions,
      name: answerName,
      type: suggestions.length ? 'suggest' : 'input',
    },
  ]);
  return answers[answerName];
}

export default requestInput;
