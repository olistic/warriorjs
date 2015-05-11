function chaiEnemy(chai) {
  const Assertion = chai.Assertion;

  Assertion.addProperty('enemy', function getter() {
    this.assert(
      this._obj.isEnemy(),
      'expected #{this} to be enemy',
      'expected #{this} not to be enemy'
    );
  });
}

export default chaiEnemy;
