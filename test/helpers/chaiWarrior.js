function chaiWarrior(chai) {
  const Assertion = chai.Assertion;

  Assertion.addProperty('warrior', function getter() {
    this.assert(
      this._obj.isWarrior(),
      'expected #{this} to be warrior',
      'expected #{this} not to be warrior'
    );
  });
}

export default chaiWarrior;
