import Base from './Base';

class Ranged extends Base {
  constructor() {
    super();
    this.addSenses(['look']);
  }

  isPlayerInSight(turn, direction) {
    const unit = turn.look(direction).find((space) => !space.isEmpty());
    return unit && unit.isPlayer();
  }
}

export default Ranged;
