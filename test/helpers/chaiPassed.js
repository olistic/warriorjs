function chaiPassed(chai) {
  const Assertion = chai.Assertion;

  Assertion.addProperty('passed', function getter() {
    this.assert(
      this._obj.passed(),
      'expected #{this} to be passed',
      'expected #{this} not to be passed'
    );
  });
}

export default chaiPassed;
