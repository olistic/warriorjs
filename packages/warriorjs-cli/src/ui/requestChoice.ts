import { select, Separator } from '@inquirer/prompts';

export const SEPARATOR = '';

function getChoices(items: any[]): any[] {
  return items.map(item => {
    if (item === SEPARATOR) {
      return new Separator();
    }

    return {
      name: item.toString(),
      short: item.toString(),
      value: item,
    };
  });
}

async function requestChoice(message: string, items: any[]): Promise<any> {
  const answer = await select({
    message,
    choices: getChoices(items),
  });
  return answer;
}

export default requestChoice;
