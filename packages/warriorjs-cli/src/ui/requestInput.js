import inquirer from 'inquirer';

const ANSWER_NAME = 'requestInput';

/**
 * Requests input from the user.
 *
 * @param {string} message The prompt message.
 */
async function requestInput(message) {
  const answers = await inquirer.prompt([
    {
      message,
      name: ANSWER_NAME,
      type: 'input',
    },
  ]);
  return answers[ANSWER_NAME];
}

export default requestInput;
