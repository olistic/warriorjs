function chaiCaptive(chai) {
  const Assertion = chai.Assertion;

  Assertion.addProperty('captive', function getter() {
    this.assert(
      this._obj.isCaptive(),
      'expected #{this} to be captive',
      'expected #{this} not to be captive'
    );
  });
}

export default chaiCaptive;
