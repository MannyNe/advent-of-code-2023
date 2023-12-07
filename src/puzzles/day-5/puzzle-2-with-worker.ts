/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable prefer-const */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
import toArray from '../../utils/toArray';
import { Worker } from 'worker_threads';

// THIS IS THE NUM OF THREADS YOU WANT TO RUN THE CODE WITH
const NUM_THREADS = 8;

let FINAL = 0;

function createWorker(
  seed: number,
  seedRange: number,
  totalAlmanac: readonly {
    readonly almanacOldEntry: string;
    readonly almanacValue: readonly string[];
  }[]
) {
  return new Promise((_resolve, _reject) => {
    const worker = new Worker(`${__dirname}/worker.js`, {
      workerData: {
        thread_count: NUM_THREADS,
        seed: seed,
        seedRange: seedRange,
        totalAlmanac: totalAlmanac,
      },
    });
    worker.once('message', (data) => {
      FINAL = FINAL > data || FINAL === 0 ? data : FINAL;
      _resolve(data);
    });
    worker.on('error', (msg) => {
      console.log(`An error occurred: ${msg}`);
    });
  });
}

async function puzzle2() {
  try {
    const wordArray = await toArray('day-5.txt');
    const seedsList = wordArray[0]
      .match(/[^seeds:\s|\s+]\d+/g)
      .map((numbers: string) => Number(numbers));
    //console.log(seedsList);
    let seeds = [];
    for (let i = 0; i < seedsList.length; i += 2) {
      seeds.push(seedsList[i], seedsList[i + 1]);
    }

    let almanacFlag = false,
      almanacEntry = '',
      almanacOldEntry = '',
      almanacValue = [],
      // eslint-disable-next-line functional/prefer-readonly-type
      totalAlmanac: {
        readonly almanacOldEntry: string;
        readonly almanacValue: readonly string[];
      }[] = [];
    for (let i = 1; i < wordArray.length; i++) {
      if (Number.isNaN(Number(wordArray[i].charAt(0)))) {
        almanacOldEntry = almanacEntry;
        almanacEntry = wordArray[i].replace(':', '');
        almanacFlag = true;
      } else {
        almanacValue.push(wordArray[i].split(' ').map(Number));
      }
      if (almanacFlag && almanacEntry !== 'seed-to-soil map') {
        totalAlmanac.push({ almanacOldEntry, almanacValue });
        almanacValue = [];
        almanacFlag = false;
      }
    }
    totalAlmanac.push({ almanacOldEntry: almanacEntry, almanacValue });

    for (let seedr = 0; seedr < seeds.length; seedr += 2) {
      const workerPromises = [];
      let oldEnd = seeds[seedr];
      for (let k = 0; k < NUM_THREADS; k++) {
        let range = (seeds[seedr + 1] / NUM_THREADS).toFixed(0);
        let start = oldEnd;
        let end =
          k + 1 === NUM_THREADS
            ? seeds[seedr] + seeds[seedr + 1]
            : Number(oldEnd) + Number(range);
        oldEnd = end;
        workerPromises.push(createWorker(start, end, totalAlmanac));
      }
      Promise.all(workerPromises).then((_data: unknown) => {
        if (seedr + 2 === seeds.length)
          console.log('THE FINAL RESULT IS: ', FINAL);
      });
    }
  } catch (error: unknown) {
    new Error('Error happened');
    console.log(error);
    return null;
  }
}

puzzle2();
