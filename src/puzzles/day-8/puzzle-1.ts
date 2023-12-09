/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
import toArray from '../../utils/toArray';

async function puzzle1() {
  try {
    const wordArray = await toArray('day-8.txt');
    let pathStr = [];
    const parentPathsObj = {};
    wordArray.map((path: string, index: number) => {
      if (index === 0) pathStr = path.split('');
      else {
        const allP = path.match(/[^()=\s]\w+/g);
        parentPathsObj[allP[0]] = [allP[1], allP[2]];
      }
    });

    let stepCounter = 0,
      nextStep = '',
      isFound = false;
    while (!isFound) {
      for (let i = 0; i < pathStr.length; i++) {
        if (i === 0 && nextStep === '') {
          if (pathStr[i] === 'R') nextStep = parentPathsObj['AAA'][1];
          else nextStep = parentPathsObj['AAA'][0];
          ++stepCounter;
          if (nextStep === 'ZZZ') {
            isFound = true;
            break;
          }
        } else {
          if (pathStr[i] === 'R') {
            nextStep = parentPathsObj[nextStep][1];
          } else {
            nextStep = parentPathsObj[nextStep][0];
          }
          ++stepCounter;
          if (nextStep === 'ZZZ') {
            isFound = true;
            break;
          }
        }
      }
    }
    console.log(stepCounter);
  } catch (error: unknown) {
    new Error('Error happened');
    console.log(error);
    return null;
  }
}

puzzle1();
