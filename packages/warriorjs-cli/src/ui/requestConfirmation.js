import inquirer from 'inquirer';

const ANSWER_NAME = 'requestConfirmation';

/**
 * Requests confirmation from the user.
 *
 * @param {string} message The prompt message.
 * @param {boolean} defaultAnswer The default answer.
 */
async function requestConfirmation(message, defaultAnswer = false) {
  const answers = await inquirer.prompt([
    {
      message,
      name: ANSWER_NAME,
      type: 'confirm',
      default: defaultAnswer,
    },
  ]);
  return answers[ANSWER_NAME];
}

export default requestConfirmation;
