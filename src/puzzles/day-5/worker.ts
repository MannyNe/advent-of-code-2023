/* eslint-disable prefer-const */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-let */
import { parentPort, workerData } from 'worker_threads';

//let isFinished = false;
/* let counter = 0;
for (let i = 0; i < 20_000_000_000 / workerData.thread_count; i++) {
  counter++;
} */

function calc() {
  let lowestNumber = workerData.seed;
  for (let val = lowestNumber; val < workerData.seedRange; val++) {
    let newSeed = 0;
    workerData.totalAlmanac.map(
      (
        valueSeed: {
          readonly almanacOldEntry: string;
          readonly almanacValue: readonly string[];
        },
        index: number
      ) => {
        /*         parentPort.postMessage(
          `Start: ${workerData.seed}, End: ${workerData.seedRange}`
        );
        parentPort.postMessage('----------------'); */
        let isAdded = false;
        for (let j = 0; j < valueSeed.almanacValue.length; j++) {
          let numList = valueSeed.almanacValue[j]
            .split(' ')
            .map((almNum: string) => Number(almNum));
          if (index === 0) {
            if (numList[1] <= val) {
              if (!isAdded) {
                if (numList[1] + numList[2] > val) {
                  newSeed = val + numList[0] - numList[1];
                  isAdded = true;
                }
              }
            } else {
              if (j + 1 === valueSeed.almanacValue.length && !isAdded)
                newSeed = val;
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
    //finalLenCount.push(newSeed);
    lowestNumber = newSeed < lowestNumber ? newSeed : lowestNumber;
  }
  return lowestNumber;
}
//isFinished = true;
parentPort.postMessage(`Final Result: ${calc()}`);
