function chaiTicking(chai) {
  const Assertion = chai.Assertion;

  Assertion.addProperty('ticking', function getter() {
    this.assert(
      this._obj.isTicking(),
      'expected #{this} to be ticking',
      'expected #{this} not to be ticking'
    );
  });
}

export default chaiTicking;
