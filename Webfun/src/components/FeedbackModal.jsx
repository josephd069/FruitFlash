import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { emojiMap } from '../utils/emojiMap.js';
import { useMusic } from '../MusicProvider.jsx';

export default function FeedbackModal({
  success,
  nextLevel,
  retryLevel,
  isLastLevel,
  rightFruit,
}) {

  /* victory if player answered correctly AND it's the final level */
  const clearedGame = success && isLastLevel;

  const { playJingle } = useMusic();          

  useEffect(() => {
    if (clearedGame) playJingle();               
  }, [clearedGame, playJingle]);

  return (
    /* dimmed backdrop*/
    <motion.div
      initial={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex mt-80 items-center justify-center z-30"
    >
      {/* card */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.15 }}
        exit={{ scale: 0 }}
        transition={{ type: 'spring', stiffness: 1000, damping: 32 }}
        className={`
    bg-[#fafafa] text-black font-pixel w-80
    border-[4px] border-black rounded-lg
    px-8 py-6 flex flex-col items-center gap-6
    ${clearedGame ? 'rainbow' : success ? 'good' : 'bad'}
  `}
      >
        {/* header */}
        {success ? (
          isLastLevel ? (
            <h3 className="text-2xl text-yellow-400 drop-shadow-[0_4px_0_rgba(0,0,0,0.8)]
                            animate-[bounce_1.25s_infinite]">
              YOU&nbsp;WIN! 🎉
            </h3>
          ) : (
          <h3
            className="text-2xl text-green-600
                       drop-shadow-[0_2px_0_rgba(0,0,0,0.7)]"
          >
            NICE&nbsp;JOB!
          </h3>
        )) : (
          <h3
            className="text-2xl text-red-600
                       drop-shadow-[0_2px_0_rgba(0,0,0,0.7)]"
          >
            OOPS!&nbsp;IT&nbsp;WAS {emojiMap[rightFruit]}
          </h3>
        )}

        {/* action buttons */}
        {success ? (
          isLastLevel ? (
            <button
              onClick={() => (window.location.href = '/FruitFlash/')}
              className="px-6 py-3 bg-yellow-300 border-4 border-black rounded-md
                         shadow-[inset_0_-4px_0_rgba(0,0,0,0.6)]
                       hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6)]
                       transition-transform duration-150
                       hover:scale-105 active:scale-100
                       "
            >
              PLAY AGAIN
            </button>
          ) : (
            <button
              onClick={nextLevel}
              className="px-6 py-3 bg-yellow-300 border-4 border-black rounded-md
                         shadow-[inset_0_-4px_0_rgba(0,0,0,0.6)]
                       hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6)]
                       transition-transform duration-150
                       hover:scale-105 active:scale-100"
            >
              NEXT&nbsp;LEVEL&nbsp;→
            </button>
          )
        ) : (
          <button
            onClick={retryLevel}
            className="px-6 py-3 bg-yellow-300 border-4 border-black rounded-md
                       shadow-[inset_0_-4px_0_rgba(0,0,0,0.6)]
                       hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6)]
                       transition-transform duration-150
                       hover:scale-105 active:scale-100"
          >
            TRY&nbsp;AGAIN
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
