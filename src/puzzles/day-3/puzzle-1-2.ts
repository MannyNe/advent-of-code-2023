/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/immutable-data */
/* eslint-disable prefer-const */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-let */
import toArray from '../../utils/toArray';

const puzzle12 = async () => {
  const rows: any = await toArray('day-3.txt');
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let totalSum = 0;
  let partNumber = [];
  let gears = new Map();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let numbers = 0;
    let rowIndex = 0;
    while (rowIndex < row.length - 1) {
      if (isNaN(row.charAt(rowIndex))) {
        rowIndex++;
      } else {
        numbers = numbers * 10 + parseInt(row.charAt(rowIndex));
        let j = rowIndex + 1;
        while (!isNaN(row.charAt(j)) && j < row.length) {
          numbers = numbers * 10 + parseInt(row.charAt(j));
          j++;
        }
        if (numbers !== 0) {
          let flag = false;
          let isGeared = false;
          let position = '';
          for (let a = rowIndex; a < j; a++) {
            for (const [directionX, directionY] of directions) {
              if (row[i + directionY]) {
                const adjacentCharacter = rows[i + directionY].charAt(
                  a + directionX
                );
                if (isNaN(adjacentCharacter) && adjacentCharacter !== '.') {
                  flag = true;
                }
                if (adjacentCharacter === '*') {
                  position = i + directionY + '-' + (a + directionX);
                  isGeared = true;
                }
              }
            }
          }
          if (flag) {
            partNumber.push(numbers);
          }
          if (isGeared) {
            if (!gears.get(position)) gears.set(position, [numbers]);
            else {
              const value = gears.get(position);
              value.push(numbers);
              gears.set(position, value);
            }

            position = '';
          }
        }
        rowIndex = j;
        numbers = 0;
      }
    }
  }
  totalSum = partNumber.reduce((a, b) => a + b);

  let gearSum = 0;
  gears.forEach((value) => {
    if (value.length === 2) {
      gearSum += value[0] * value[1];
    }
  });
  console.log('The total sum', totalSum);
  console.log('Sum of adjacent gears', gearSum);
};

puzzle12();
