import constructTurnHeader from '../constructors/constructTurnHeader';
import constructLogMessage from '../constructors/constructLogMessage';

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
        line = constructLogMessage(event.unit, message);
      }
      break;
    }
    default:
      break;
  }

  return line;
}

export default eventMessage;
