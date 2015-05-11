function chaiPlayer(chai) {
  const Assertion = chai.Assertion;

  Assertion.addProperty('player', function getter() {
    this.assert(
      this._obj.isPlayer(),
      'expected #{this} to be player',
      'expected #{this} not to be player'
    );
  });
}

export default chaiPlayer;
