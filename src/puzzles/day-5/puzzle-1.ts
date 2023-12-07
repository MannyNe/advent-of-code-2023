/* eslint-disable prefer-const */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
import toArray from '../../utils/toArray';

async function puzzle1() {
  try {
    const wordArray = await toArray('day-5.txt');
    const seeds = wordArray[0]
      .match(/[^seeds:\s|\s+]\d+/g)
      .map((numbers: string) => Number(numbers));
    let almanacFlag = false,
      almanacEntry = '',
      almanacOldEntry = '',
      almanacValue = [],
      totalAlmanac = [];
    for (let i = 1; i < wordArray.length; i++) {
      if (Number.isNaN(Number(wordArray[i].charAt(0)))) {
        almanacOldEntry = almanacEntry;
        almanacEntry = wordArray[i].replace(':', '');
        almanacFlag = true;
      } else {
        almanacValue.push(wordArray[i]);
      }
      if (almanacFlag && almanacEntry !== 'seed-to-soil map') {
        totalAlmanac.push({ almanacOldEntry, almanacValue });
        almanacValue = [];
        almanacFlag = false;
      }
    }
    totalAlmanac.push({ almanacEntry, almanacValue });

    let finalLenCount = [];
    seeds.map((seed: number) => {
      let newSeed = 0;
      totalAlmanac.map(
        (
          valueSeed: {
            readonly almanacOldEntry: string;
            readonly almanacValue: readonly string[];
          },
          index: number
        ) => {
          let isAdded = false;
          for (let j = 0; j < valueSeed.almanacValue.length; j++) {
            let numList = valueSeed.almanacValue[j]
              .split(' ')
              .map((almNum: string) => Number(almNum));
            if (index === 0) {
              if (numList[1] <= seed) {
                if (!isAdded) {
                  if (numList[1] + numList[2] > seed) {
                    newSeed = seed + numList[0] - numList[1];
                    isAdded = true;
                  }
                }
              } else {
                if (j + 1 === valueSeed.almanacValue.length && !isAdded)
                  newSeed = seed;
              }
            } else {
              if (numList[1] <= newSeed) {
                if (!isAdded) {
                  if (numList[1] + numList[2] > newSeed) {
                    newSeed = newSeed + numList[0] - numList[1];
                    isAdded = true;
                  }
                }
              }
            }
          }
        }
      );
      finalLenCount.push(newSeed);
    });
    console.log(finalLenCount.sort((a, b) => a - b)[0]);
  } catch (error: unknown) {
    new Error('Error happened');
    console.log(error);
    return null;
  }
}

puzzle1();
