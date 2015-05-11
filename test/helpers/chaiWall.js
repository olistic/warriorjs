function chaiWall(chai) {
  const Assertion = chai.Assertion;

  Assertion.addProperty('wall', function getter() {
    this.assert(
      this._obj.isWall(),
      'expected #{this} to be wall',
      'expected #{this} not to be wall'
    );
  });
}

export default chaiWall;
