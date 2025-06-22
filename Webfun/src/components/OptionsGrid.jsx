import { useGame } from '../GameProvider.jsx';
import { useMemo } from 'react';
import { emojiMap} from '../utils/emojiMap.js';
import { shuffle, fruitPool } from '../utils/levelGenerator.js';

export default function OptionsGrid({ onSelect }) {
  const { state } = useGame();
  const { fruits, level } = state;          // fruits = [{name,count}, …]

  /* ------------------------------------------------------------------
     Build the button list only when fruits OR level actually change.
     This avoids reshuffling every 1 s while the question timer ticks. */
  const options = useMemo(() => {
    /* real answers, one per shown fruit kind */
    const baseNames = fruits.map(f => f.name);

    /* +1 decoy every 3 levels (Lv1-3 → 0, Lv4-6 → 1, Lv7-9 → 2, …) */
    const extra = Math.min(
      Math.floor((level - 1) / 3),
      fruitPool.length - baseNames.length
    );

    /* decoys come from fruits NOT on the belt */
    const decoys = shuffle(
      fruitPool.filter(name => !baseNames.includes(name))
    ).slice(0, extra);

    return shuffle([...baseNames, ...decoys]);
  }, [fruits, level]);

  return (
    <div className="grid mx-auto gap-4 mt-60 grid-cols-3">
      {options.map(name => (
        <button
          key={name}
          onClick={() => onSelect(name)}
          className="w-30 h-30 flex items-center justify-center
                     bg-white border-2 border-black rounded
                     shadow-[inset_0_-4px_0_rgba(0,0,0,0.6)]
                       hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6)]
                       transition-transform duration-150
                       hover:scale-105 active:scale-100 hover:bg-yellow-200"
        >
          <span className="text-6xl select-none">{emojiMap[name]}</span>
        </button>
      ))}
    </div>
  );
}
