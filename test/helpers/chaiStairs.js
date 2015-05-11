function chaiStairs(chai) {
  const Assertion = chai.Assertion;

  Assertion.addProperty('stairs', function getter() {
    this.assert(
      this._obj.isStairs(),
      'expected #{this} to be stairs',
      'expected #{this} not to be stairs'
    );
  });
}

export default chaiStairs;
