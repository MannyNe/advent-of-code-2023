/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
import toArray from '../../utils/toArray';

async function puzzle1() {
  try {
    const wordArray = await toArray('day-2.txt');
    let sum = 0;

    wordArray.map((game: string) => {
      const result = game.match(/\d{1,2}\s(red|green|blue)/g);
      const sizeArray: { red?: number; green?: number; blue?: number } = {};
      result.map((cubits: string) => {
        const word = cubits.split(' ');
        const amount = Number(word[0]);
        const color = word[1];
        switch (color) {
          case 'red':
            if (!sizeArray.red || sizeArray.red < amount) {
              sizeArray.red = amount;
            }
            break;
          case 'green':
            if (!sizeArray.green || sizeArray.green < amount) {
              sizeArray.green = amount;
            }
            break;
          case 'blue':
            if (!sizeArray.blue || sizeArray.blue < amount) {
              sizeArray.blue = amount;
            }
            break;
          default:
            break;
        }
      });
      const red = sizeArray.red ? sizeArray.red : 0;
      const green = sizeArray.green ? sizeArray.green : 0;
      const blue = sizeArray.blue ? sizeArray.blue : 0;
      sum +=
        (red === 0 ? 1 : red) *
        (green === 0 ? 1 : green) *
        (blue === 0 ? 1 : blue);
    });
    console.log(sum);
  } catch (error: unknown) {
    new Error('Error happened');
    return null;
  }
}

puzzle1();
