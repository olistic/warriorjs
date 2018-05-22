import inquirer from 'inquirer';

/**
 * Requests confirmation from the user.
 *
 * @param {string} message The prompt message.
 * @param {boolean} defaultAnswer The default answer.
 */
async function requestConfirmation(message, defaultAnswer = false) {
  const answerName = 'requestConfirmation';
  const answers = await inquirer.prompt([
    {
      message,
      name: answerName,
      type: 'confirm',
      default: defaultAnswer,
    },
  ]);
  return answers[answerName];
}

export default requestConfirmation;
