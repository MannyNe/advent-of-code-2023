/* eslint-disable prefer-const */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
import toArray from '../../utils/toArray';

async function puzzle1() {
  try {
    const wordArray = await toArray('day-6.txt');
    const timeDistance = wordArray.map((numStrings: string) =>
      numStrings.match(/[^\s\w:]|\d+/g).map((nums: string) => Number(nums))
    );
    let sum = 0;
    let lowestListNumbers = [];
    for (let i = 0; i < timeDistance[0].length; i++) {
      let numList = [];
      for (let j = 0; j < timeDistance[0][i]; j++) {
        let addNum = (timeDistance[0][i] - j) * j;
        if (addNum > timeDistance[1][i]) {
          numList.push(addNum);
        }
      }
      lowestListNumbers.push(numList.length);
    }
    sum = lowestListNumbers.reduce((a, b) => a * b);
    console.log(sum);
  } catch (error: unknown) {
    new Error('Error happened');
    console.log(error);
    return null;
  }
}

puzzle1();
