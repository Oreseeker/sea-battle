import { SBMapCell } from '@/SBMapCell/SBMapCell.js';
import { generate2DArray } from '@/utils/array.js';

console.log('SBMapCell', SBMapCell);

/**
 * @typedef {true | 'beyond_border' | 'adjacent_cells_occupied'} ShipPlacementStatus
 * */

export class SBMap {
  size;
  _cells;

  constructor({ size }) {
    this.size = size;
    /**
     * @type {SBMapCell[][]}
     * */
    this._cells = this._createInitialCellsState();
  }

  _createInitialCellsState() {
    const cells = generate2DArray(this.size, this.size);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        cells[i][j] = [new SBMapCell(i, j)];
      }
    }
    return cells;
    // return generate2DArray(this.size, this.size, 'normal');
  }


  /**
   * Функция размещает корабль на указанной клетке. Возвращает true, если указанный корабль может быть размещён на указанной клетке в указанной ориентации.
   * В противном случае возвращает строку, которая является типом ошибки размещения: beyond_border - корабль
   * не может быть размещён, т.к. выезжает за границы, adjacent_cells_occupied - корабль не может быть размещён, т.к. соседние
   * клетки заняты.
   * @param {SBShip} ship
   * @param {SBMapCell} cell
   * @param {'up' | 'right' | 'down' | 'left'} orientation
   * @return {ShipPlacementStatus}
   * */
  placeShip(ship, cell, orientation) {
    const status = this._getShipPlacementStatus(ship, cell, orientation);
    if (status !== true) return status;

    const numberOfCellsRequired = ship.length - 1;


    let x, y, startX, startY;

    switch(orientation) {
      case 'down':
        x = cell.x;
        startY = cell.y;
        for (let i = 0; i < numberOfCellsRequired + 1; i++) {
          this._cells[x][startY + i].state = 'occupied';
        }
        break;
      case 'up':
        x = cell.x;
        startY = cell.y;
        for (let i = 0; i < numberOfCellsRequired + 1; i++) {
          this._cells[x][startY - i].state = 'occupied';
        }
        break;
      case 'right':
        y = cell.y;
        startX = cell.x;
        for (let i = 0; i < numberOfCellsRequired + 1; i++) {
          this._cells[startX + i][y].state = 'occupied';
        }
        break;
      case 'left':
        y = cell.y;
        startX = cell.x;
        for (let i = 0; i < numberOfCellsRequired + 1; i++) {
          this._cells[startX - i][y].state = 'occupied';
        }
        break;
    }

    return true;
  }

  /**
   * Функция возвращает true, если указанный корабль может быть размещён на указанной клетке в указанной ориентации.
   * В противном случае возвращает строку, которая является типом ошибки размещения: beyond_border - корабль
   * не может быть размещён, т.к. выезжает за границы, adjacent_cells_occupied - корабль не может быть размещён, т.к. соседние
   * клетки заняты
   * @param {SBShip} ship
   * @param {SBMapCell} cell
   * @param {'up' | 'right' | 'down' | 'left'} orientation
   * @return {ShipPlacementStatus}
   * */
  _getShipPlacementStatus(ship, cell, orientation) {
    const shipIsPlacedWithinBorder = this._isShipPlacedWithinBorder(ship, cell, orientation);
    if (!shipIsPlacedWithinBorder) return 'beyond_border';
    const canCellBeOccupied = this._canCellBeOccupied(cell);
    if (!canCellBeOccupied) return 'adjacent_cells_occupied';
    return true;
  }

  /**
   * Функция проверяет, выходит ли корабль за границы, если его установить на указанную клетку при указанной
   * ориентации
   * @param {SBShip} ship
   * @param {SBMapCell} cell
   * @param {'up' | 'right' | 'down' | 'left'} orientation
   * @return {boolean}
   * */
  _isShipPlacedWithinBorder(ship, cell, orientation) {
    const numberOfCellsRequired = ship.length - 1;
    let finalCoordinate;
    if (orientation === 'right') finalCoordinate = cell.x + numberOfCellsRequired;
    else if (orientation === 'left') finalCoordinate = cell.x - numberOfCellsRequired;
    else if (orientation === 'up') finalCoordinate = cell.y - numberOfCellsRequired;
    else finalCoordinate = cell.y + numberOfCellsRequired;
    return finalCoordinate >= 0 && finalCoordinate < this.size;
  }

  /**
   * Функция проверяет, есть ли занятое место вокруг клетки. Выход за границы считается как "есть".
   * @param {SBMapCell} cell
   * @return {boolean}
   * */
  _canCellBeOccupied(cell) {
    /* Вообще говоря излишне делать проверку во всех клетках вокруг клетки при постановке корабля, как минимум 1-2 клетки проверять не нужно */
    const [x, y] = cell;
    const cellsCoordinatesToCheck = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
      [x - 1, y - 1],
      [x - 1, y + 1],
      [x + 1, y - 1],
      [x + 1, y + 1],
    ];
    return cellsCoordinatesToCheck.every(coords =>  {
      const cellIsBeyondMap = coords[0] < 0 || coords[1] < 0 || coords[0] > this.size || coords[1] > this.size;
      if (cellIsBeyondMap) return true;
      return this._cells[x][y].state === 'normal';
    });
  }
}
