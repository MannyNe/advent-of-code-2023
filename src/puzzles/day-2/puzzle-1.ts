/* eslint-disable functional/no-let */
import toArray from '../../utils/toArray';
enum Color {
  red = 12,
  green,
  blue,
}

async function puzzle1() {
  try {
    const wordArray = await toArray('day-2.txt');
    let sum = 0;

    wordArray.map((game: string, index: number) => {
      const result = game.match(/\d{1,2}\s(red|green|blue)/g);
      let flag = false;
      result.map((cubits: string) => {
        const word = cubits.split(' ');
        const amount = Number(word[0]);
        const color = word[1];
        switch (color) {
          case 'red':
            if (amount > Color.red) flag = true;
            break;
          case 'green':
            if (amount > Color.green) flag = true;
            break;
          case 'blue':
            if (amount > Color.blue) flag = true;
            break;
          default:
            break;
        }
      });
      if (!flag) sum += index + 1;
    });
    console.log(sum);
  } catch (error: unknown) {
    new Error('Error happened');
    return null;
  }
}

puzzle1();
