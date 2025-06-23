import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGame } from './GameProvider.jsx';
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/solid';
import menuMusic   from "assets/audio/menu-music.mp3";
import gameMusic   from "assets/audio/game-music2.ogg";
import bossMusic   from "assets/audio/boss-music.mp3";
import victorySfx  from "assets/audio/victory.mp3";

/* --------------------------------------------------------------
   CONTEXT
----------------------------------------------------------------*/
const MusicCtx = createContext();
export const useMusic = () => useContext(MusicCtx);

/* final level threshold */
const FINAL_LEVEL = 10;

export function MusicProvider({ children }) {
  const audioMain = useRef(null);   // menu + normal game
  const audioBoss = useRef(null);   // boss theme loop
  const location  = useLocation();
  const jingleRef = useRef(null);
  const { state } = useGame();      // get current level
  const { level } = state;

  /* muted flag (start true so autoplay passes) */
  const [muted, setMuted] = useState(true);

  /* helper that obeys mute */
  const safePlay = (ref, { restart = false } = {}) => {
    if (!ref.current) return;
    ref.current.muted = muted;
    if (restart) ref.current.currentTime = 0;
    ref.current.play().catch(() => {});
  };

  const safePause = (ref) => {
    if (!ref.current) return;
    ref.current.pause();
    ref.current.currentTime = 0;
  };

  /* --------------------------------------------------------------
     MAIN EFFECT — runs whenever route, level, or mute state changes
  ----------------------------------------------------------------*/
  useEffect(() => {
    const path     = location.pathname;
    const inGame   = path.startsWith('/play');
    const bossNow  = inGame && level >= FINAL_LEVEL;

    if (bossNow) {
        /* ---- BOSS THEME ONLY ---- */
        safePause(audioMain);    // A. stop normal track
        safePlay(audioBoss);     // play boss loop
    } else {
        /* ---- MENU or NORMAL GAME ---- */
        safePause(audioBoss);    // ensure boss stops
        const wantedSrc = inGame ? gameMusic : menuMusic;

        if (audioMain.current?.src.endsWith(wantedSrc) === false) {
            audioMain.current.src = wantedSrc;
            audioMain.current.currentTime = 0;
        }
        safePlay(audioMain);     // B. will NOT run when bossNow=true
    }
}, [location.pathname, level, muted]);

  useEffect(() => {
    [audioMain, audioBoss, jingleRef].forEach((r) => {
      if (r.current) r.current.muted = muted;
    });
  }, [muted]);

  const playJingle = () => {
    safePlay(jingleRef, { restart: true });
  };

  return (
    <MusicCtx.Provider value={{ muted, setMuted, playJingle }}>
      <audio ref={audioMain} loop autoPlay />
      <audio ref={audioBoss} src={bossMusic} loop />
      <audio ref={jingleRef} src={victorySfx} />
      {children}
      <SoundToggle />
    </MusicCtx.Provider>
  );
}

/* --------------------------------------------------------------
   Floating speaker toggle (top-right)
----------------------------------------------------------------*/
function SoundToggle() {
  const { muted, setMuted } = useMusic();
  const navigate = useNavigate();

  /* reset to Home & un-mute if user long-presses (optional easter egg) */
  function handleToggle() {
    setMuted(!muted);
  }

  return (
    <button
      onClick={handleToggle}
      className="fixed right-4 top-4 z-40 w-10 h-10
                 bg-yellow-300 border-4 border-black rounded-md
                 flex items-center justify-center
                 hover:bg-yellow-200 active:translate-y-0.5
                 transition-all"
    >
      {muted ? (
        <SpeakerXMarkIcon className="w-6 h-6 text-black" />
      ) : (
        <SpeakerWaveIcon className="w-6 h-6 text-black" />
      )}
    </button>
  );
}
