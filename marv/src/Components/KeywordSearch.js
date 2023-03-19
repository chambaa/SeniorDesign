import React, { useEffect, useState }  from 'react';
import 'font-awesome/css/font-awesome.min.css';
import TwitterAPI from './TwitterAPI';
import PieChart from './PieChart';
import Map from './Map';

function KeywordSearch() {
    const [keyword, setKeyword] = useState('');
    var pos = 0;
    var neg = 0;
    var neut = 0;

    const [data, setData] = useState([
        {property: 'Undefined', value: 100}
    ]);

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        var sentimentResult = await TwitterAPI(keyword)

        sentimentResult.map(result => {
          console.log(result)
          if(result.sentiment === "Positive") {
            pos++;
          }
          else if(result.sentiment === "Negative") {
            neg++;
          }
          else if(result.sentiment === "Neutral") {
            neut++;
          }
        })

        var newData = [
          {property: 'Positive', value: pos * 10},
          {property: 'Negative', value: neg * 10},
          {property: 'Neutral', value: neut * 10}
        ]
        console.log(newData)
        setData(newData)
    }
    

    return (
      <div>
        <div className="keyword">
          <h1>Enter a Keyword!</h1>
          <h3>Determine the public option of your product</h3>
          <br/>
          <form onSubmit={handleSubmit} style={{"margin": "auto", "maxWidth": "500px", "position": "relative"}}>
              <div style={{"display":"flex"}}>
              <input className="keywordInput" autoComplete='off' type="text" name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
              <button className="keywordBtn" type="button" id="keywordSearchBtn" onClick={handleSubmit}><i id="keywordSearchIcon" className="fa fa-search"></i></button>
              </div>
          </form>
        </div>
        <PieChart 
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
        <Map 
          keyword = {keyword}
          />
      </div>
    );
  }
  
  export default KeywordSearch;
