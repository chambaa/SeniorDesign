import './App.css';
import KeywordSearch from './Components/KeywordSearch'
import React from 'react';
import SentimentAnalysis from './Components/SentimentAnalysis';
import Map from './Components/Map';

function App() {
  return (
    <div className="App">
      <KeywordSearch/>
      <Map/>
    </div>
  );
}

export default App;
