import React from 'react';
import './stylesheets/globalstyles.scss'
import'./stylesheets/app.scss'
import MainTitle from './modules/mainTitle/MainTitle';

function App() {
  return (
    <div className="App">
      <div className="display">
    <MainTitle/>
      </div>
    </div>
  );
}

export default App;
