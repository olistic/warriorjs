import constructTurnHeader from './constructTurnHeader';
import logMessage from './logMessage';

/**
 * Constructs a event message.
 * @param  {Object} event      A event from the generated events
 * @param  {Number} turnNumber Current turn
 * @return {String}            Returns the event message line
 */
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
