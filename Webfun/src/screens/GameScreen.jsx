import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../GameProvider.jsx';
import { generateLevel } from '../utils/levelGenerator.js';

import Conveyor        from '../components/Conveyor.jsx';
import NumberPrompt    from '../components/NumberPrompt.jsx';
import OptionsGrid     from '../components/OptionsGrid.jsx';
import FeedbackModal from '../components/FeedbackModal.jsx';
import TimerHud     from '../components/TimerHud.jsx';


export default function GameScreen() {
  const { state, dispatch } = useGame();
  const { phase, level, targetCount, fruits } = state;
  const navigate = useNavigate();
  const [questionKey, setQuestionKey] = useState(0);

  const levelColor = level < 4
  ? 'text-green-400'       // easy  (Lv 1–3)
  : level < 7
  ? 'text-yellow-400'      // medium (Lv 4–6)
  : level < 10
  ? 'text-red-400'
  : 'text-purple-300';  

  const [isCorrect, setIsCorrect] = useState(null);   // null | true | false

    /* per-question countdown */
  const questionSeconds = 7;          // visible on HUD
  const [timer, setTimer] = useState(questionSeconds);

  /* ─── start first level on mount ───────────────────────────── */
  useEffect(() => {startLevel(level);}, []);

  function startLevel(levelNum) {
    const { fruits, target } = generateLevel(levelNum);
    dispatch({ type: 'START_LEVEL', fruits, target });
  }

  /* ─── auto-switch from 'show' → 'question' ────────────────── 
  useEffect(() => {
    if (phase !== 'show') return;
    const id = setTimeout(() => dispatch({ type:'SET_PHASE', phase:'question' }), 8000);
    return () => clearTimeout(id);
  }, [phase, dispatch]);*/

  function handleShowComplete() {
  dispatch({ type: 'SET_PHASE', phase: 'question' });
  setQuestionKey(k => k + 1);
  }

  useEffect(() => {
    if (phase !== 'question') return;

    setTimer(questionSeconds);        // reset
    const id = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(id);
          handleAnswer('');           // timeout counts as wrong
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);   // cleanup if answered early
  }, [phase, fruits]);

  /* ─── handle clicks from OptionsGrid ───────────────────────── */
  function handleAnswer(pickedName) {
    if (phase !== 'question') return;

    const rightFruit = fruits.find(f => f.count === targetCount).name;
    const correct    = pickedName === rightFruit;
    setIsCorrect(correct);

    if (correct) dispatch({ type:'ADD_SCORE', points: 100 });

    dispatch({ type:'SET_PHASE', phase:'feedback' });
    }

    function retrySameLevel() {
    startLevel(level);                 // regenerate counts
    setIsCorrect(null);
    }

    function goToNextLevel() {
    if (level >= 10) {                // adjust last level if needed
      navigate('/end');
      return;
    }
    dispatch({ type: 'INCREMENT_LEVEL' });
    startLevel(level + 1);
    setIsCorrect(null);
  }

    const isLast = level >= 10;


  /* ─── UI ───────────────────────────────────────────────────── */
  return (
    
    <div className="w-full max-w-xl mt-10 flex flex-col items-center relative">
        {/* HUD bar */}
      <div className="absolute inset-x-0 top-0 flex justify-between items-center
                      px-4 py-2 text-sm z-30 select-none pointer-events-none">
        {/* HOME button */}
        <Link to="/"
              className="pointer-events-auto inline-block text-black bg-yellow-300 border-2 border-black
                       px-8 py-2.25 text-xl rounded
                       shadow-[inset_0_-4px_0_rgba(0,0,0,0.6)]
                       hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6)]
                       transition-transform duration-150
                       hover:scale-105 active:scale-100">
          HOME
        </Link>

        {/* Level title */}
        <div className={`${levelColor} text-5xl absolute left-1/2 top-2 -translate-x-1/2 drop-shadow-sm`}>
          LEVEL&nbsp;{level}
        </div>

        {phase === 'question' && (
        <div className="absolute right-4 top-2">
            {/* key forces a fresh animation each time */}
            <TimerHud key={questionKey} totalSeconds={questionSeconds} />
        </div>
        )}</div>

      {phase === 'show' && (<Conveyor onComplete={handleShowComplete} />)}

      {phase === 'question' && (
        <>
          <NumberPrompt />
          <OptionsGrid onSelect={handleAnswer} />
        </>
      )}

      {phase === 'feedback' && (
        <FeedbackModal
        success={isCorrect}
        nextLevel={goToNextLevel}
        retryLevel={retrySameLevel}
        rightFruit={fruits.find(f => f.count === targetCount).name}
        isLastLevel={isLast}
      />
      )}
    </div>
    
  );
}
