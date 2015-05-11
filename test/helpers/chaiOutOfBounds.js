function chaiOutOfBounds(chai) {
  const Assertion = chai.Assertion;

  Assertion.addMethod('outOfBounds', function method(x, y) {
    this.assert(
      this._obj.isOutOfBounds(x, y),
      'expected #{this} to be out of bounds',
      'expected #{this} not to be out of bounds'
    );
  });
}

export default chaiOutOfBounds;
