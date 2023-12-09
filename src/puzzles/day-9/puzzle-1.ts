/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable prefer-const */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-let */
import toArray from '../../utils/toArray';

async function puzzle1() {
  try {
    const wordArray = await toArray('day-9.txt');
    const sum = [];
    wordArray.map((wordList: string) => {
      const numList = wordList.split(' ').map(Number);
      let nextIteration = numList,
        finished = false;
      let finalList = [nextIteration];
      while (!finished) {
        let newNextIteration: number[] = [];
        for (let i = 1; i < nextIteration.length; i++) {
          newNextIteration.push(nextIteration[i] - nextIteration[i - 1]);
        }
        finished = newNextIteration.every((num: number) => num === 0);
        finalList.push(newNextIteration);
        nextIteration = newNextIteration;
      }

      let next = 0;
      for (let i = finalList.length - 1; i > 0; i--) {
        next = finalList[i - 1][finalList[i - 1].length - 1] + next;
      }
      sum.push(next);
    });
    console.log(sum.reduce((a, b) => a + b));
  } catch (error: unknown) {
    new Error('Error happened');
    console.log(error);
    return null;
  }
}

puzzle1();
