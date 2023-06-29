import { SBMap } from './SBMap/SBMap';

export class SeaBattleGame {
  constructor() {
    this.mapSize = 10;
    this.shipsLimits = {
      1: 4,
      2: 3,
      3: 2,
      4: 1,
    };
    this.ownMap = new SBMap({ size: this.mapSize });
    this.enemyMap = new SBMap({ size: this.mapSize });

    this.enablePreparationPhase();
  }

  enablePreparationPhase() {

  }
}
