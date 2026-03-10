import { confirm } from '@inquirer/prompts';

async function requestConfirmation(
  message: string,
  defaultAnswer: boolean = false,
): Promise<boolean> {
  const answer = await confirm({
    message,
    default: defaultAnswer,
  });
  return answer;
}

export default requestConfirmation;
