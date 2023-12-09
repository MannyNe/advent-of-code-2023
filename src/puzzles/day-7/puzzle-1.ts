/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
import toArray from '../../utils/toArray';

const FIVE_OF_A_KIND = [];
const FOUR_OF_A_KIND = [];
const FULL_HOUSE = [];
const THREE_OF_A_KIND = [];
const TWO_PAIR = [];
const ONE_PAIR = [];
const HIGH_CARD = [];
const strengthOrder = 'AKQJT98765432';

let sum = 0;
let handSize = 0;
let hands = {};

const addHands = (kindArray: readonly string[]) => {
  kindArray.map((hand: string) => {
    sum += Number(hands[hand]) * handSize;
    --handSize;
  });
};

const customSort = (alphabet: string) => {
  const alphabetMap = new Map();

  for (let i = 0; i < alphabet.length; i++) {
    alphabetMap.set(alphabet[i], i);
  }

  return (a: string, b: string) => {
    let minLength = Math.min(a.length, b.length);
    for (let i = 0; i < minLength; i++) {
      const index_a = alphabetMap.get(a[i]);
      const index_b = alphabetMap.get(b[i]);
      if (index_a !== index_b) {
        return index_a - index_b;
      }
    }
    return a.length - b.length;
  };
};

async function puzzle1() {
  try {
    const wordArray = await toArray('day-7.txt');

    let mainList = wordArray.flatMap((x: string) => x.split(' '));
    mainList.forEach((items: string, index: number) => {
      if (index % 2 === 0) hands[items] = mainList[index + 1];
    });

    for (const bet of Object.keys(hands)) {
      let orderdHand = bet.split('').sort((a, b) => a.localeCompare(b));
      let totalStore = [];
      for (let i = 0; i < orderdHand.length; i++) {
        if (orderdHand[i] === orderdHand[i + 1]) {
          let finished = false,
            similarCharsLen = 2,
            indexNext = i + 1;
          while (!finished) {
            if (orderdHand[indexNext] === orderdHand[indexNext + 1]) {
              ++similarCharsLen;
              ++indexNext;
              if (
                indexNext === orderdHand.length &&
                orderdHand[indexNext] === orderdHand[indexNext - 1]
              ) {
                ++similarCharsLen;
                finished = true;
                totalStore.push(similarCharsLen);
              }
            } else {
              finished = true;
              i = indexNext;
              totalStore.push(similarCharsLen);
            }
          }
        } else {
          totalStore.push(1);
        }
      }
      switch (totalStore.length) {
        case 1:
          FIVE_OF_A_KIND.push(bet);
          break;
        case 2:
          if (totalStore.includes(4)) FOUR_OF_A_KIND.push(bet);
          else FULL_HOUSE.push(bet);
          break;
        case 3:
          if (totalStore.includes(3)) THREE_OF_A_KIND.push(bet);
          else TWO_PAIR.push(bet);
          break;
        case 4:
          ONE_PAIR.push(bet);
          break;
        case 5:
          HIGH_CARD.push(bet);
          break;
        default:
          break;
      }
    }
    let sorting = customSort(strengthOrder);
    handSize = mainList.length / 2;

    addHands(FIVE_OF_A_KIND.sort(sorting));
    addHands(FOUR_OF_A_KIND.sort(sorting));
    addHands(FULL_HOUSE.sort(sorting));
    addHands(THREE_OF_A_KIND.sort(sorting));
    addHands(TWO_PAIR.sort(sorting));
    addHands(ONE_PAIR.sort(sorting));
    addHands(HIGH_CARD.sort(sorting));

    console.log(sum);
  } catch (error: unknown) {
    new Error('Error happened');
    console.log(error);
    return null;
  }
}

puzzle1();
