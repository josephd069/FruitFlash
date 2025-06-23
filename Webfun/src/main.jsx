import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';          // tailwind import is here
import { HashRouter } from 'react-router-dom';
import { GameProvider } from './GameProvider.jsx';
import { MusicProvider } from './MusicProvider.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter  basename="/FruitFlash">
      <GameProvider>
        <MusicProvider>      
          <App />
        </MusicProvider>
      </GameProvider>
    </HashRouter>
  </React.StrictMode>
);