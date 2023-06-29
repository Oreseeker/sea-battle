export class SBMapCell {
  /**
   * @param {number} x
   * @param {number} y
   * @param {'normal' | 'missed' | 'occupied'} state;
   * */
  constructor(x, y, state = 'normal') {
    this.x = x;
    this.y = y;
    this.state = state;
  }
}
