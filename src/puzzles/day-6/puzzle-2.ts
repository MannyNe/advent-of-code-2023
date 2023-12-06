/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
import toArray from '../../utils/toArray';

async function puzzle2() {
  try {
    const wordArray = await toArray('day-6.txt');
    const timeDistance = wordArray
      .map((numStrings: string) =>
        numStrings.match(/[^\s\w:]|\d+/g).reduce((a, b) => a + b)
      )
      .map((numStr: string) => Number(numStr));
    let sum = 0;
    for (let j = 0; j < timeDistance[0]; j++) {
      let addNum = (timeDistance[0] - j) * j;
      if (addNum > timeDistance[1]) {
        sum += 1;
      }
    }
    console.log(sum);
  } catch (error: unknown) {
    new Error('Error happened');
    console.log(error);
    return null;
  }
}

puzzle2();
