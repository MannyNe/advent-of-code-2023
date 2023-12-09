/* eslint-disable prefer-const */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
import toArray from '../../utils/toArray';

const denominator = (result: number, nextResult: number): number => {
  return nextResult === 0
    ? result
    : denominator(nextResult, result % nextResult);
};

async function puzzle2() {
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

    const starters = [];
    Object.keys(parentPathsObj).map((keys: string) => {
      if (keys.charAt(keys.length - 1) === 'A') starters.push(keys);
    });

    let stepsCollection = [];
    starters.map((inits: string) => {
      let stepCounter = 0,
        isFound = false,
        nextStep = '';
      while (!isFound) {
        for (let i = 0; i < pathStr.length; i++) {
          if (i === 0 && nextStep === '') {
            if (pathStr[i] === 'R') nextStep = parentPathsObj[inits][1];
            else nextStep = parentPathsObj[inits][0];
            ++stepCounter;
            if (nextStep.endsWith('Z')) {
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
            if (nextStep.endsWith('Z')) {
              isFound = true;
              break;
            }
          }
        }
      }
      stepsCollection.push(stepCounter);
    });

    let calc = stepsCollection[0];
    for (let i = 1; i < stepsCollection.length; i++) {
      let multiplier = calc * stepsCollection[i];
      let newDenominator = denominator(calc, stepsCollection[i]);
      calc = multiplier / newDenominator;
    }

    console.log(calc);
  } catch (error: unknown) {
    new Error('Error happened');
    console.log(error);
    return null;
  }
}

puzzle2();
