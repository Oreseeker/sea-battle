import { SBMap } from '@/SBMap/SBMap';
import { SBShip } from '@/SBShip';

test('SBMap.constructor', () => {
  expect(1).toBe(1);
  const size = 12;
  const map = new SBMap({ size });
  expect(map.size).toBe(size);
  expect(map._cells.length).toBe(size);

  map._cells.forEach((el1, idx) => {
    el1.forEach((el2, cellIdx) => {
      const cell = el2[0];
      expect(cell.state).toBe('normal');
      expect(cell.x).toBe(idx);
      expect(cell.y).toBe(cellIdx);
    });
  })
});

// test('SBMap._isShipPlacedWithinBorder', () => {
//   const map = new SBMap({ size: 12 });
//   expect(map.size).toBe(12);
//
//   const ship = new SBShip(3);
//
//   map._isShipPlacedWithinBorder();
// });
