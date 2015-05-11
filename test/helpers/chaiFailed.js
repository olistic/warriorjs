function chaiFailed(chai) {
  const Assertion = chai.Assertion;

  Assertion.addProperty('failed', function getter() {
    this.assert(
      this._obj.failed(),
      'expected #{this} to be failed',
      'expected #{this} not to be failed'
    );
  });
}

export default chaiFailed;
