import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../GameProvider.jsx';

export default function EndScreen() {
  const { state, dispatch } = useGame();
  const { score, level }   = state;
  const navigate = useNavigate();

  function playAgain() {
    /* reset global state then push to /play */
    dispatch({ type: 'RESET' });
    navigate('/play');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center
                    font-pixel text-white bg-[#0f2c2c] relative overflow-hidden">

      {/* scan-lines like Home/Game */}
      <div className="pointer-events-none absolute inset-0
            before:absolute before:inset-0 before:content-['']
            before:bg-[repeating-linear-gradient(0deg,_transparent_0px,_transparent_1px,_rgba(0,0,0,0.28)_2px,_rgba(0,0,0,0.28)_3px)]" />

      {/* pixel confetti (CSS keyframes) */}
      <div className="absolute inset-0 animate-confetti pointer-events-none"></div>

      {/* Center card */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative z-10 bg-[#fafafa] text-black border-[6px] border-black
                   rounded-md shadow-[0_0_0_4px_#000] px-10 py-12 flex flex-col
                   items-center gap-8 w-96 mt-10"
      >
        {/* Title */}
        <h1 className="text-3xl text-yellow-400 drop-shadow-[0_4px_0_rgba(0,0,0,0.8)]">
          YOU&nbsp;WIN!
        </h1>

        {/* Stats */}
        <p className="text-lg">
          Reached&nbsp;Level:&nbsp;<span className="text-green-500">{level}</span>
        </p>
        <p className="text-lg">
          Score:&nbsp;<span className="text-green-500">{score}</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={playAgain}
            className="w-full bg-yellow-300 text-black border-4 border-black rounded-md
                       py-3 shadow-[inset_0_-5px_0_rgba(0,0,0,0.6)]
                       hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6)]
                       active:translate-y-1 transition-all"
          >
            PLAY&nbsp;AGAIN
          </button>

          <Link
            to="/"
            className="w-full bg-yellow-300 text-black border-4 border-black rounded-md
                       py-3 shadow-[inset_0_-5px_0_rgba(0,0,0,0.6)]
                       hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6)]
                       active:translate-y-1 transition-all text-center"
          >
            HOME
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
