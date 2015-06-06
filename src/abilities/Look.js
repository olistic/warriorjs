import Base from './Base';

class Look extends Base {
  getDescription() {
    return 'Returns an array of up to three Spaces in the given direction (forward by default).';
  }

  perform(direction = 'forward') {
    this.verifyDirection(direction);
    return [1, 2, 3].map((amount) => this.getSpace(direction, amount).getPlayerObject());
  }
}

export default Look;
