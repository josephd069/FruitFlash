import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import { useGame } from '../GameProvider.jsx';

export default function NumberPrompt() {
  const { state } = useGame();
  const controls = useAnimationControls();       // drives the NUMBER
  const overlay  = useAnimationControls();       // drives the BACKDROP

  /* animation sequence */
  useEffect(() => {
    async function run() {
      /* A ▸ DARKEN screen & pop-in number */
      overlay.set({ opacity: 0.75 });
      await Promise.all([
        overlay.start({ opacity: 0.75 }),       
        controls.start({
          scale: 5,
          transition: { duration: 0.0 }
        })
      ]);

      /* fade overlay + shrink/slide number */
      await new Promise(r => setTimeout(r, 250)); // brief pause

      await Promise.all([
        overlay.start({
          opacity: 0,
          transition: { duration: 1.2, ease: 'easeOut' }
        }),
        controls.start({
          top: '5rem',
          scale: 1,
          transition: { duration: 1.2, ease: 'easeInOut' }
        })
      ]);
    }
    run();
  }, [controls, overlay]);

  return (
    <>
      {/* full-screen dark backdrop */}
      <motion.div
        className="absolute w-screen h-screen -mt-10 bg-black pointer-events-none z-40"
        initial={{ opacity: 0 }}
        animate={overlay}
      />

      {/* popping / sliding number */}
      <motion.div
        initial={{ scale: 5, top: '15.5rem' }}
        animate={controls}
        className="absolute left-1/2 -translate-x-1/2 z-50
                   font-pixel text-yellow-200 text-9xl drop-shadow select-none"
        style={{ pointerEvents: 'none' }}
      >
        {state.targetCount}
      </motion.div>
    </>
  );
}
