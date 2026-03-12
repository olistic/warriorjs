/** Class representing a game error. */
class GameError extends Error {
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, GameError);
  }
}

export default GameError;
