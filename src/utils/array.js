/**
 * @param {number} m длина массива по первому индексу
 * @param {number} n длина массива по второму индексу
 * @param {any} [filler] значение, которым будем заполнен каждый элемент массива
 * */
export function generate2DArray(m, n, filler) {
  const arr = [];

  for (let i = 0; i < m; i++) {
    arr.push([]);
    for (let j = 0; j < n; j++) {
      arr[i].push(filler);
    }
  }

  return arr;
}
