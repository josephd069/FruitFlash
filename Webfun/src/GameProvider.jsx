import { createContext, useContext, useReducer } from 'react';

const GameContext = createContext();

const initialState = {
  level: 1,
  phase: 'home',       // 'show' | 'hide' | 'question' | 'feedback' | 'end'
  score: 0,
  targetCount: null,
  fruits: [],          // generated for current level
  theme: 'fruits',     // easy switch to 'animals', etc.
};

function reducer(state, action) {
  switch (action.type) {
    case 'START_LEVEL':
      return { ...state, phase: 'show', fruits: action.fruits, targetCount: action.target };
    case 'SET_PHASE':
      return { ...state, phase: action.phase };
    case 'INCREMENT_LEVEL':
      return { ...state, level: state.level + 1 };
    case 'ADD_SCORE':
      return { ...state, score: state.score + action.points };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
}

export const useGame = () => useContext(GameContext);
