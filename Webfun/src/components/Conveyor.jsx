import { useLayoutEffect, useRef } from 'react';
import { useGame } from '../GameProvider.jsx';
import { emojiMap } from '../utils/emojiMap.js';   // or sprite component import
import { shuffle } from '../utils/levelGenerator.js';

const baseSpeed = 100;

export default function Conveyor({onComplete}) {
  const { state } = useGame();
  const { fruits, level } = state; 
  const wrapperRef = useRef(null);
  const rowRef     = useRef(null);

  const rawQueue = fruits.flatMap(f => Array(f.count).fill(f.name));
  const queue = level > 9 ? shuffle(rawQueue) : rawQueue;

  useLayoutEffect(() => {
    const wrapW = wrapperRef.current.offsetWidth;
    const rowW  = rowRef.current.offsetWidth;
    const distance = wrapW + rowW;                       
    const speed    = baseSpeed * (1 + level * 0.4);     
    const dur      = distance / speed;                  
    rowRef.current.style.setProperty('--beltDur', `${dur}s`);
  }, [level, state.fruits]);  // recalc if fruit list changes

  return (
    <div ref={wrapperRef} className="relative mt-65 w-full h-[90px] overflow-hidden">
      <div className="absolute inset-0 bg-neutral-700/40 before:absolute before:inset-0
                      
                      motion-safe:animate-[flicker_12s_infinite]" />
      <div
        ref={rowRef}
        onAnimationEnd={onComplete}
        className="absolute top-1/2 -translate-y-1/2 flex gap-6 animate-belt"
        style={{ animationDuration: 'var(--beltDur)' }}
      >
        {queue.map((fruit, i) => (
          <span key={i} className="text-5xl drop-shadow sprite select-none">
            {emojiMap[fruit]}
          </span>
        ))}
      </div>
    </div> 
  );
}
