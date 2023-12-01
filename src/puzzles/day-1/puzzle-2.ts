/* eslint-disable functional/no-let */
import toArray from '../../utils/toArray';

enum Numbers {
  one = 1,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
}

async function puzzle2() {
  try {
    const wordArray = await toArray('day-1.txt');
    let sum = 0;

    wordArray.map((word: string) => {
      const patternFirst = /(one|two|three|four|five|six|seven|eight|nine)|\d/g;
      const patternLast = /(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)|\d/g;
      const resultFirst = word.match(patternFirst);
      // eslint-disable-next-line functional/immutable-data
      const resultLast = word.split('').reverse().join('').match(patternLast);

      if (resultFirst.length === 1) {
        if (!resultFirst[0].match(/\d/g)) {
          sum += Numbers[resultFirst[0]] * 10 + Numbers[resultFirst[0]];
        } else {
          const concatStr = Number(resultFirst[0] + resultFirst[0]);
          sum += concatStr;
        }
      } else {
        const num1 = resultFirst[0].match(/\d/g)
          ? resultFirst[0].match(/\d/g)[0]
          : Numbers[resultFirst[0]].toString();
        const num2 = resultLast[0].match(/\d/g)
          ? resultLast[0].match(/\d/g)[0]
          : // eslint-disable-next-line functional/immutable-data
            Numbers[resultLast[0].split('').reverse().join('')].toString();
        sum += Number(num1 + num2);
      }
    });
    console.log(sum);
  } catch (error: unknown) {
    new Error('Error happened');
    return null;
  }
}

puzzle2();
