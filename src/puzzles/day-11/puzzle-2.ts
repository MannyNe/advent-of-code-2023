/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable prefer-const */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
import toArray from '../../utils/toArray';

const DISTANCE = 1000000;

async function puzzle2() {
  try {
    const wordArray = await toArray('day-11.txt');
    let totalX = [],
      totalY = [],
      totalCharLocation: number[][] = [],
      sum = 0;
    wordArray.map((symbols: string, ind: number) => {
      let y = [],
        charLocation: number[] = [];
      let symbolArray = symbols.split('');
      symbolArray.map((pos: string, index: number) => {
        if (pos === '.') y.push(index);
        else charLocation.push(index);
      });
      if (y.length === symbolArray.length) totalX.push(ind);
      if (totalY.length === 0) totalY.push(...y);
      else {
        totalY = totalY.filter((element: number) => y.includes(element));
      }
      totalCharLocation.push(charLocation);
    });

    totalCharLocation.map((locations: readonly number[], index: number) => {
      if (locations.length > 1) {
        for (let i = 0; i < locations.length; i++) {
          let ii = i + 1;
          while (ii < locations.length) {
            let start =
              totalY.filter((el: number) => el < locations[i]).length *
                (DISTANCE - 1) +
              locations[i];
            let end =
              totalY.filter((el: number) => el < locations[ii]).length *
                (DISTANCE - 1) +
              locations[ii];
            sum += Math.abs(start - end);
            ++ii;
          }
        }
      }
      locations.map((num: number) => {
        let start =
          totalY.filter((el: number) => el < num).length * (DISTANCE - 1) + num;
        let indexNew = index + 1,
          steps = 1;
        while (indexNew < totalCharLocation.length) {
          for (let i = 0; i < totalCharLocation[indexNew].length; i++) {
            let end =
              totalY.filter((el: number) => el < totalCharLocation[indexNew][i])
                .length *
                (DISTANCE - 1) +
              totalCharLocation[indexNew][i];
            sum += Math.abs(start - end) + steps;
          }
          if (totalCharLocation[indexNew].length === 0) steps += DISTANCE;
          else ++steps;
          ++indexNew;
        }
      });
    });
    console.log(sum);
  } catch (error: unknown) {
    new Error('Error happened');
    console.log(error);
    return null;
  }
}

puzzle2();
