function chaiAlive(chai) {
  const Assertion = chai.Assertion;

  Assertion.addProperty('alive', function getter() {
    this.assert(
      this._obj.isAlive(),
      'expected #{this} to be alive',
      'expected #{this} to be dead'
    );
  });
}

export default chaiAlive;
