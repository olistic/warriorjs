function chaiEpic(chai) {
  const Assertion = chai.Assertion;

  Assertion.addProperty('epic', function getter() {
    this.assert(
      this._obj.isEpic(),
      'expected #{this} to be epic',
      'expected #{this} to be normal'
    );
  });
}

export default chaiEpic;
