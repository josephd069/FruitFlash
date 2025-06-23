import { useState } from 'react';
import { Link } from 'react-router-dom';
import HowToModal from '../components/HowToModal.jsx';

export default function HomeScreen() {

  const [showHelp, setShowHelp] = useState(false);
  
  return (
    /* full-screen wrapper / background */
    <div className="min-h-screen flex flex-col items-center justify-center
                    font-pixel text-white bg-[#0f2c2c] overflow-hidden">

      {/* scanline overlay that spans the whole viewport */}
      <div className="pointer-events-none absolute inset-0
                      before:absolute before:inset-0
                      before:content-[''] 
                      before:bg-[repeating-linear-gradient(0deg,_transparent_0px,_transparent_1px,_rgba(0,0,0,0.28)_2px,_rgba(0,0,0,0.28)_3px)]
                      motion-safe:animate-[flicker_12s_infinite]">
      </div>

      {/* central panel */}
      <div className="relative z-10  border-4 border-yellow-400
                      px-30 py-32 rounded-lg text-center">
        <h1 className="text-5xl sm:text-7xl mb-12 leading-none
                       drop-shadow-[0_6px_0px_rgba(0,0,0,0.8)] ">
          FRUIT FLASH 
        </h1>

        <div className="flex flex-col gap-5 items-center">
          {/* START */}
          <Link
            to="/play"
            className="inline-block text-black bg-yellow-300 border-2 border-black
                       px-14 py-4 text-xl rounded
                       shadow-[inset_0_-4px_0_rgba(0,0,0,0.6)]
                       hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6)]
                       transition-transform duration-150
                       hover:scale-105 active:scale-100
                       animate-[bounce_1.25s_infinite]"
                       
          >
            START
          </Link>

          {/* HOW TO PLAY */}
          <button
            onClick={() => setShowHelp(true)}
            className="inline-block text-black bg-cyan-300 border-2 border-black
                       px-8 py-3 text-base rounded
                       shadow-[inset_0_-3px_0_rgba(0,0,0,0.6)]
                       hover:shadow-[inset_0_-1px_0_rgba(0,0,0,0.6)]
                       transition-transform duration-150
                       hover:scale-105 active:scale-100"
          >
            HOW&nbsp;TO&nbsp;PLAY
          </button>
        </div>

        <p className="mt-8 text-xs tracking-wider opacity-70">
          © 2025&nbsp;FruitSoft&nbsp;Studios
        </p>
      </div>
      {/* Pop-up help card */}
      {showHelp && <HowToModal onClose={() => setShowHelp(false)} />}
    </div>
  );
}
