import { input } from '@inquirer/prompts';

async function requestInput(message: string, _suggestions: string[] = []): Promise<string> {
  const answer = await input({
    message,
  });
  return answer;
}

export default requestInput;
