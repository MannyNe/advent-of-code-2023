/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
import toArray from '../../utils/toArray';

async function puzzle1() {
  try {
    const wordArray = await toArray('day-4.txt');
    let sum = 0;
    const cardSizes = Array(wordArray.length).fill(1);

    for (let i = 0; i < wordArray.length; i++) {
      const result = wordArray[i]
        .replace(/Card\s+\d+:\s+/g, '')
        .match(/[^(Card\s+\d:)]|\d{1,2}/g);
      const leftNumbers = [],
        rightNumbers = [];
      let flag = false;
      result.map((numberStr: string) => {
        if (!flag) {
          if (!Number.isNaN(Number(numberStr.trim()))) {
            leftNumbers.push(Number(numberStr.trim()));
          } else {
            flag = true;
          }
        } else {
          rightNumbers.push(Number(numberStr));
        }
      });
      let amount = 0;
      leftNumbers.forEach((winningNumber: number) => {
        if (rightNumbers.includes(winningNumber)) {
          amount++;
        }
      });
      if (amount > 0) {
        for (let j = 1; j <= amount; j++) {
          if (i + j < wordArray.length) {
            cardSizes[i + j] += cardSizes[i];
          }
        }
      }
    }
    sum = cardSizes.reduce((a, b) => a + b, 0);
    console.log(sum);
  } catch (error: unknown) {
    new Error('Error happened');
    console.log(error);
    return null;
  }
}

puzzle1();
