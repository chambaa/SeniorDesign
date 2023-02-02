import React, { useState, useEffect }  from 'react';
import 'font-awesome/css/font-awesome.min.css';
import TwitterAPI from './TwitterAPI';

function KeywordSearch() {
    const [keyword, setKeyword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        TwitterAPI(keyword);
        alert(`The Keyword you entered was: ${keyword}`)
    }


    return (
      <div className="keyword">
        <h1>Enter a Keyword!</h1>
        <h3>Determine the public option of your product</h3>
        <br/>
        <form onSubmit={handleSubmit} style={{"margin": "auto", "maxWidth": "500px", "position": "relative"}}>
            <div style={{"display":"flex"}}>
            <input className="keywordInput" autoComplete='off' type="text" name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
            <button className="keywordBtn" type="button" id="keywordSearchBtn" onClick={handleSubmit}><i id="keywordSearchIcon" class="fa fa-search"></i></button>
            </div>
        </form>
      </div>
    );
  }
  
  export default KeywordSearch;