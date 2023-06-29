import { SBMapCell } from '@/SBMapCell/SBMapCell.js';

test('SBMapCell creation', () => {
  const cell = new SBMapCell(1, 2);
  expect(cell.x).toBe(1);
  expect(cell.y).toBe(2);
  expect(cell.state).toBe('normal');

  const cell2 = new SBMapCell(333, 1124, 'occupied');
  expect(cell2.x).toBe(333);
  expect(cell2.y).toBe(1124);
  expect(cell2.state).toBe('occupied');
});
