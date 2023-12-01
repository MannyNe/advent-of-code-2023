/* eslint-disable functional/no-let */
import toArray from '../../utils/toArray';

async function puzzle1() {
  try {
    const wordArray = await toArray('day-1.txt');
    let sum = 0;
    wordArray.map((word: string) => {
      const pattern = /\d/g;
      const result = word.match(pattern);
      if (result.length === 1) {
        const concatStr = Number(result[0] + result[0]);
        sum += concatStr;
      } else {
        sum += Number(result[0] + result[result.length - 1]);
      }
    });
    console.log(sum);
  } catch (error: unknown) {
    new Error('Error happened');
    return null;
  }
}

puzzle1();
