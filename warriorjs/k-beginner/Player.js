class Player {
  playTurn(warrior) {
    // Cool code goes here

    this._nextSpaces = warrior.look('backward');
    if (this._nextSpaces[2].isStairs()) {
      this.walkForward = true;
    }
    if (this._nextSpaces[0].isEnemy()) {
      warrior.attack('backward');
      return;
    }
    if (this._nextSpaces[0].isEmpty() && this._nextSpaces[1].isEnemy()) {
      warrior.shoot('backward');
      return;
    }
    if (
      this._nextSpaces[0].isEmpty() &&
      this._nextSpaces[1].isEmpty() &&
      this._nextSpaces[2].isEnemy()
    ) {
      warrior.shoot('backward');
      return;
    }

    if (this.notFirstContact) {
      this._nextSpaces = warrior.look();
      if (this._nextSpaces[0].isEnemy()) {
        warrior.attack();
        return;
      }
      if (this._nextSpaces[0].isEmpty() && this._nextSpaces[1].isEnemy()) {
        warrior.shoot();
        return;
      }
      if (
        this._nextSpaces[0].isEmpty() &&
        this._nextSpaces[1].isEmpty() &&
        this._nextSpaces[2].isEnemy()
      ) {
        warrior.shoot();
        return;
      }
    }

    if (warrior.feel().isWall()) {
      warrior.pivot();
    } else if (
      warrior.feel('backward').isEmpty() &&
      /*(warrior.health() < 8 && this._health > warrior.health()) || */ !this
        .walkForward
    ) {
      warrior.walk('backward');
    } else if (warrior.feel('backward').isFriendly() && !this.walkForward) {
      warrior.rescue('backward');
      this.notFirstContact = true;
    } else if (warrior.feel().isCaptive()) {
      warrior.rescue();
      this.notFirstContact = true;
    } else if (warrior.feel().isEnemy()) {
      warrior.attack();
      this.notFirstContact = true;
      //} else if (warrior.health() < 20 && this._health <= warrior.health()) {
      //  warrior.rest();
    } else {
      warrior.walk();
    }

    this._health = warrior.health();
    if (warrior.feel('backward').isWall()) {
      this.walkForward = true;
    }
  }
}
