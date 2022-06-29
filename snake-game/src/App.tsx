import React from 'react';
import './stylesheets/globalstyles.scss'
import './stylesheets/app.scss'
import MainTitle from './modules/mainTitle/MainTitle';
import NameInput from './modules/nameInput/NameInput';
import GameEnv from './modules/gameScreen/GameEnv';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScoreBoard from './modules/scoreboard/scoreBoard';

function App() {
  return (

     <div className="App">
      <div className="display">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainTitle />} />
            <Route path='/start_game' element={<NameInput />} />
            <Route path='/game' element={<GameEnv />} />
            <Route path='/scores' element={<ScoreBoard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>

  );
}

export default App;
