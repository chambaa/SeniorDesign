import React, { useEffect, useState }  from 'react';
import 'font-awesome/css/font-awesome.min.css';
import TwitterAPI from './TwitterAPI';
import PieChart from './PieChart';
import { LoadScript } from "@react-google-maps/api";
import Map from './Map';
import EmojiChart from './emojiChart.js';

function KeywordSearch() {
    const [keyword, setKeyword] = useState('');
    const [keyword2, setKeyword2] = useState('');
    var pos = 0;
    var neg = 0;
    var neut = 0;

    const emojiRe = /(\p{EPres}|\p{ExtPict})/gu;
    const regionalRe = /^((?=[\p{Regional_Indicator}]).)*$/u;
    var emojiArr = [];

    const [data, setData] = useState([
        {property: 'Undefined', value: 100}
    ]);

    const [EmojiData, setEmojiData] = useState([{}]);

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

          for(const match of result.text.matchAll(emojiRe)){
            const emoji = match[0];
            if(regionalRe.test(emoji)){ // Don't add regional emojis
              continue;
            }
            console.log(`emoji detected ${ emoji }`);
            let newValue = true;
            for(var i = 0; i < emojiArr.length; i++){
              if(emojiArr[i]['property'] == emoji){
                emojiArr[i]['value'] += 1;
                newValue = false;
              }
            }
            if(newValue){emojiArr.push({'property': emoji, 'value': 1})}
          }
        })

        var newData = [
          {property: 'Positive', value: pos * 10},
          {property: 'Negative', value: neg * 10},
          {property: 'Neutral', value: neut * 10}
        ]

        console.log(newData)
        setData(newData)
        setKeyword2(keyword)
        setEmojiData(emojiArr)
        console.log(emojiArr);
    }
    const lib = ["places"];
    const key = "AIzaSyBgt_ybrpI0hzarHDx7Og1LkV5mS8lheQw"; // PUT GMAP API KEY HERE
    

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
        <EmojiChart 
          data={EmojiData}
          width={200}
          height={350}
        />
        {keyword2 !== '' ?
          <LoadScript googleMapsApiKey={key} libraries={lib}>
            <Map 
              keyword = {keyword2}
              />
          </LoadScript> : <div/>
        }
      </div>
    );
  }
  
  export default KeywordSearch;
