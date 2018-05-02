/** Class representing a game error. */
class GameError extends Error {
  /**
   * Creates a game error.
   *
   * @param {string} message The error message.
   */
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, GameError);
  }
}

export default GameError;
