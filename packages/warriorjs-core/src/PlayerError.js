/** Class representing a player error. */
class PlayerError extends Error {
  /**
   * Creates a player error.
   *
   * @param {string} message The error message.
   */
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, PlayerError);
  }
}

export default PlayerError;
