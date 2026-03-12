import { input } from '@inquirer/prompts';

async function requestInput(message: string, suggestions: string[] = []): Promise<string> {
  const answer = await input({
    message,
    default: suggestions[0],
  });
  return answer;
}

export default requestInput;
