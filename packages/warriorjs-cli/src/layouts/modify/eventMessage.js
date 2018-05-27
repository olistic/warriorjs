import constructTurnHeader from './constructTurnHeader';
import logMessage from './logMessage';

function eventMessage(event, turnNumber) {
  let line = null;

  const { type } = event;
  switch (type) {
    case 'TURN':
      line = constructTurnHeader(this.screen.width, turnNumber);
      break;
    case 'UNIT': {
      const { message } = event;
      if (message) {
        line = logMessage(event.unit, message);
      }
      break;
    }
    default:
      break;
  }

  return line;
}

export default eventMessage;
