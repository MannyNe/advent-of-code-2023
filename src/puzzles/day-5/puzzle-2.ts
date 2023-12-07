/* eslint-disable prefer-const */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
import toArray from '../../utils/toArray';

async function puzzle2() {
  try {
    const wordArray = await toArray('day-5.txt');
    const seeds = wordArray[0]
      .match(/[^seeds:\s|\s+]\d+/g)
      .map((numbers: string) => Number(numbers));

    let almanacFlag = false,
      almanacEntry = '',
      almanacValue = [],
      totalAlmanac = [];
    for (let i = 1; i < wordArray.length; i++) {
      if (Number.isNaN(Number(wordArray[i].charAt(0)))) {
        almanacEntry = wordArray[i].replace(':', '');
        almanacFlag = true;
      } else {
        if (wordArray[i] !== '')
          almanacValue.push(wordArray[i].split(/\s+/g).map(Number));
      }
      if (almanacFlag && almanacEntry !== 'seed-to-soil map') {
        totalAlmanac.push(almanacValue);
        almanacValue = [];
        almanacFlag = false;
      }
    }
    totalAlmanac.push(almanacValue);

    const newMaps = totalAlmanac
      .reverse()
      .map((x) => x.sort((a, b) => a[0] - b[0]));
    const locations = newMaps[0];
    const otherMaps = newMaps.splice(1);

    let lowestStart;
    for (let locationSet of locations) {
      let currentNumber = locationSet[1];
      for (let i = locationSet[1]; i < locationSet[1] + locationSet[2]; i++) {
        currentNumber = i;
        otherMaps.forEach((otherMap) => {
          for (let set of otherMap) {
            if (currentNumber >= set[0] && currentNumber < set[0] + set[2]) {
              currentNumber = set[1] + (currentNumber - set[0]);
              break;
            }
          }
        });
        for (let seed = 0; seed < seeds.length; seed += 2) {
          if (
            currentNumber >= seeds[seed] &&
            currentNumber < seeds[seed] + seeds[seed + 1]
          ) {
            lowestStart = i - locationSet[1];
            break;
          }
        }
        if (lowestStart >= 0) {
          break;
        }
      }
      if (lowestStart >= 0) {
        break;
      }
    }
    console.log(lowestStart);
  } catch (error: unknown) {
    new Error('Error happened');
    console.log(error);
    return null;
  }
}

puzzle2();
