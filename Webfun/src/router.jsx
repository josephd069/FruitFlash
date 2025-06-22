// src/App.jsx  (or router.jsx if you split routing)
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import HomeScreen  from './screens/HomeScreen.jsx';
import GameScreen  from './screens/GameScreen.jsx';
import EndScreen   from './screens/EndScreen.jsx';

export default function App() {
  const location = useLocation();   // gives a unique key per route

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"      element={<HomeScreen />} />
        <Route path="/play"  element={<GameScreen />} />
        <Route path="/end"   element={<EndScreen  />} />
      </Routes>
    </AnimatePresence>
  );
}
