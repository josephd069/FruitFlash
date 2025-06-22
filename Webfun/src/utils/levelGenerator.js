// 8-item pool – extend or reorder any time
export const fruitPool = [
  'apple',
  'strawberry',
  'peach',
  'banana',
  'grape',
  'orange',
  'kiwi',
  'pineapple',
  'watermelon'
];

// Fisher-Yates shuffle
export function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function generateLevel(level = 1) {
  const numTypes = Math.min(2 + Math.floor((level - 1) / 3) , fruitPool.length);   // 3,4,5…

  /* 1 ▸ choose the fruit kinds */
  const chosen = shuffle(fruitPool).slice(0, numTypes);

  /* 2 ▸ generate a pool of unique counts */
  const maxCount = 3 + Math.floor((level - 1) / 3);                               // 4,5,6…
  if (maxCount < numTypes) throw new Error('maxCount too small');
  const countPool = shuffle([...Array(maxCount).keys()].map(n => n + 1))
                     .slice(0, numTypes);                   // e.g. [3,1,5]

  /* 3 ▸ zip fruit ↔ count (no duplicates) */
  const fruits = chosen.map((name, idx) => ({
    name,
    count: countPool[idx],
  }));

  /* 4 ▸ pick the target number */
  const target = fruits[Math.floor(Math.random() * fruits.length)].count;

  return { fruits, target };
}
