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
import { select } from "d3-selection";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

function KeywordSearch() {
    const [keyword, setKeyword] = useState('');
    const [keyword2, setKeyword2] = useState('');
    const [words, setWords] = useState([]);
    const [dialogTweets, setDialogTweets] = useState([]);
    const [sent, setSent] = useState([]);
    const [callbacks, setCallbacks] = useState({});
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    var pos = 0;
    var neg = 0;
    var neut = 0;
    var negKeywords = {};
    var posKeywords = {};
    var setSentRes = [];

    const emojiRe = /(\p{EPres}|\p{ExtPict})/gu;
    const regionalRe = /^((?=[\p{Regional_Indicator}]).)*$/u;
    var emojiArr = [];

    const [data, setData] = useState([
        {property: 'Undefined', value: 100}
    ]);

    const [EmojiData, setEmojiData] = useState([{}]);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function getCallback(callback) {
      return function (word, event) {
        const isActive = callback !== "onWordMouseOut";
        const element = event.target;
        console.log(element)
        const text = select(element);
        var val = word.text;
        text
          .on("click", () => {
            var temp = []
            setSentRes.map(result => {
              if(result.text.includes(val)) {
                console.log(result.text)
                temp.push(result.text)
              }
              return null;
            })
            setDialogTweets(temp)
            if (isActive) {
              handleClickOpen();
              console.log("clicked")
            }
          })
          .transition()
          .attr("background", "white")
          .attr("font-weight", isActive ? "bold" : "none")
          .attr("text-decoration", isActive ? "underline" : "none");
      };
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        var sentimentResult = await TwitterAPI(keyword)
        setSentRes = sentimentResult;
        setSent(sentimentResult)

        sentimentResult.map(result => {
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
              return null;
            })
          }
          if(resultWords.negative.length > 0) {
            resultWords.negative.map(word => {
              var val = negKeywords[word] ? negKeywords[word] + 1 : 1;
              negKeywords[word] = val;
              return null;
            })
          }
          return null;
        })

        var newData = [];
        if(pos > 0) {
          newData.push({property: 'Positive', value: pos});
        }
        if(neg > 0) {
          newData.push({property: 'Negative', value: neg});
        }
        if(neut > 0) {
          newData.push({property: 'Neutral', value: neut});
        }

        setData(newData)
        setKeyword2(keyword)
        setEmojiData(emojiArr)

        const tempWords = [];
        for (var poskey in posKeywords) {
          var obj = {
            text: poskey,
            value: posKeywords[poskey],
          }    
          tempWords.push(obj)
        }
        for (var negkey in negKeywords) {
          var objNeg = {
            text: negkey,
            value: negKeywords[negkey],
          }    
          tempWords.push(objNeg)
        }
        console.log(tempWords)
        setWords(tempWords)

        setCallbacks({
          getWordColor: word => negKeywords[word.text] ? "#f29900" : "#79b68b",
          getWordTooltip: word => `The word "${word.text}" appears ${word.value} times. [${negKeywords[word.text] ? "negative" : "positive"}]`,
          onWordClick: getCallback("onWordClick"),
          onWordMouseOut: getCallback("onWordMouseOut"),
          onWordMouseOver: getCallback("onWordMouseOver"),
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
          <h3>Determine the public opinion of your company</h3>
          <br/>
          <form onSubmit={handleSubmit} style={{"margin": "auto", "maxWidth": "500px", "position": "relative"}}>
              <div style={{"display":"flex"}}>
              <input className="keywordInput" autoComplete='off' type="text" name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
              <button className="keywordBtn" type="button" id="keywordSearchBtn" onClick={handleSubmit}><i id="keywordSearchIcon" className="fa fa-search"></i></button>
              </div>
          </form>
        </div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Tweets"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{overflowY: "auto", maxHeight: "200px"}}>
              {dialogTweets.map((text) => (
                <li>{text}</li>
              ))}
            </DialogContentText>
            </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {keyword2 !== '' ?
        <div>
          <div className='dataVis'>
            <PieChart 
              data={data}
              width={300}
              height={370}
              innerRadius={0}
              outerRadius={150}
              setDialogTweets={setDialogTweets}
              setOpen={setOpen}
              sent={sent}
            />
            <EmojiChart 
              data={EmojiData}
              width={200}
              height={350}
              setDialogTweets={setDialogTweets}
              setOpen={setOpen}
              sent={sent}
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
