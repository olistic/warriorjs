function chaiBound(chai) {
  const Assertion = chai.Assertion;

  Assertion.addProperty('bound', function getter() {
    this.assert(
      this._obj.isBound(),
      'expected #{this} to be bound',
      'expected #{this} to be unbound'
    );
  });
}

export default chaiBound;
