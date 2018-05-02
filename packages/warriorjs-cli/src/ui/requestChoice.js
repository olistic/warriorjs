import inquirer from 'inquirer';

const ANSWER_NAME = 'requestChoice';

export const SEPARATOR = '';

function getChoices(items) {
  return items.map(item => {
    if (item === SEPARATOR) {
      return new inquirer.Separator();
    }

    return {
      name: item.toString(),
      short: item.toString(),
      value: item,
    };
  });
}

/**
 * Requests a selection of one of the given items from the user.
 *
 * @param {string} message The prompt message.
 * @param {any[]} items The items to choose from.
 */
async function requestChoice(message, items) {
  const answers = await inquirer.prompt([
    {
      message,
      name: ANSWER_NAME,
      type: 'list',
      choices: getChoices(items),
    },
  ]);
  return answers[ANSWER_NAME];
}

export default requestChoice;
