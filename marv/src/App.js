import './App.css';
import SentimentAnalysis from './Components/SentimentAnalysis';
import KeywordSearch from './Components/KeywordSearch'
import TwitterAPI from './Components/TwitterAPI';
import React from 'react';

function App() {
  return (
    <div className="App">
      <KeywordSearch/>
    </div>
  );
}

export default App;
