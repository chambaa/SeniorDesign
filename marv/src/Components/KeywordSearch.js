import React, { useState }  from 'react';
import 'font-awesome/css/font-awesome.min.css';
import TwitterAPI from './TwitterAPI';
import PieChart from './PieChart';
import { LoadScript } from "@react-google-maps/api";
import Map from './Map';
import EmojiChart from './emojiChart.js';
import Sentiment from 'sentiment';
import ReactWordcloud from 'react-wordcloud';
import logo from '../marv.png'

function KeywordSearch() {
    const [keyword, setKeyword] = useState('');
    const [keyword2, setKeyword2] = useState('');
    const [words, setWords] = useState([]);
    const [callbacks, setCallbacks] = useState({});
    var pos = 0;
    var neg = 0;
    var neut = 0;
    var negKeywords = {};
    var posKeywords = {};

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
              if(emojiArr[i]['property'] === emoji){
                emojiArr[i]['value'] += 1;
                newValue = false;
              }
            }
            if(newValue){emojiArr.push({'property': emoji, 'value': 1})}
          }

          var sentiment = new Sentiment();
          var resultWords = sentiment.analyze(result.text);
          if(resultWords.positive.length > 0) {
            resultWords.positive.map(word => {
              var val = posKeywords[word] ? posKeywords[word] + 1 : 1;
              posKeywords[word] = val
            })
          }
          if(resultWords.negative.length > 0) {
            resultWords.negative.map(word => {
              var val = negKeywords[word] ? negKeywords[word] + 1 : 1;
              negKeywords[word] = val;
            })
          }
        })

        var newData = [];
        if(pos > 0) {
          newData.push({property: 'Positive', value: pos * 10});
        }
        if(neg > 0) {
          newData.push({property: 'Negative', value: neg * 10});
        }
        if(neut > 0) {
          newData.push({property: 'Neutral', value: neut * 10});
        }

        console.log(newData)
        setData(newData)
        setKeyword2(keyword)
        setEmojiData(emojiArr)
        console.log(emojiArr);

        const tempWords = [];
        for (var poskey in posKeywords) {
          var obj = {
            text: poskey,
            value: posKeywords[poskey],
          }    
          tempWords.push(obj)
        }
        for (var negkey in negKeywords) {
          var obj = {
            text: negkey,
            value: negKeywords[negkey],
          }    
          tempWords.push(obj)
        }
        console.log(tempWords)
        setWords(tempWords)

        setCallbacks({
          getWordColor: word => negKeywords[word.text] ? "#f29900" : "#79b68b",
          onWordClick: console.log,
          onWordMouseOver: console.log,
          getWordTooltip: word => `${word.text} (${word.value}) [${negKeywords[word.text] ? "negative" : "positive"}]`,
        });
    }
    const lib = ["places"];
    const key = "AIzaSyBgt_ybrpI0hzarHDx7Og1LkV5mS8lheQw"; // PUT GMAP API KEY HERE

    const options = {
      rotations: 2,
      rotationAngles: [-90, 0],
      // fontFamily: "impact",
      fontSizes: [10, 100],
      fontStyle: "normal",
      fontWeight: "normal",
    };
    const size = [250, 200];    

    return (
      <div>
        <div className="keyword">
          <h1>Enter the name of your business</h1>
          <h3>Determine the public option of your company</h3>
          <br/>
          <form onSubmit={handleSubmit} style={{"margin": "auto", "maxWidth": "500px", "position": "relative"}}>
              <div style={{"display":"flex"}}>
              <input className="keywordInput" autoComplete='off' type="text" name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
              <button className="keywordBtn" type="button" id="keywordSearchBtn" onClick={handleSubmit}><i id="keywordSearchIcon" className="fa fa-search"></i></button>
              </div>
          </form>
        </div>
        {keyword2 !== '' ?
        <div>
          <div className='dataVis'>
            <PieChart 
              data={data}
              width={300}
              height={370}
              innerRadius={0}
              outerRadius={150}
            />
            <EmojiChart 
              data={EmojiData}
              width={200}
              height={350}
            />
            <ReactWordcloud
              style={{width: "300px", height: "300px"}}
              callbacks={callbacks}
              options={options}
              size={size}
              words={words}
            />
          </div>  
          <LoadScript googleMapsApiKey={key} libraries={lib}>
            <Map 
              keyword = {keyword2}
              />
          </LoadScript> 
        </div> : <div className='logo'><img src={logo} className="App-logo" alt="logo" /></div>
        }
      </div>
    );
  }
  
  export default KeywordSearch;
