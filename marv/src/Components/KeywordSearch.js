import React, { useState, useRef }  from 'react';
import 'font-awesome/css/font-awesome.min.css';
import TwitterAPI from './TwitterAPI';
import PieChart from './PieChart';
import { LoadScript } from "@react-google-maps/api";
import Map from './Map';
import EmojiChart from './emojiChart.js';
import Sentiment from 'sentiment';
import ReactWordcloud from 'react-wordcloud';
import logo from '../marv.png'
import logo2 from '../marv2.png'
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
    const [words, setWords] = useState([]);
    const [dialogTweets, setDialogTweets] = useState([]);
    const [sent, setSent] = useState([]);
    const [callbacks, setCallbacks] = useState({});
    const [open, setOpen] = useState(false);
    const [tweetsRet, setTweetsRet] = useState(false);
    const [mesg, setMesg] = useState("");
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

    function isLetter(str) {
      return str.length === 1 && str.match(/[a-z]/i);
    }

    function getCallback(callback) {
      return function (word, event) {
        const isActive = callback !== "onWordMouseOut";
        const element = event.target;
        const text = select(element);
        var val = word.text;
        text
          .on("click", () => {
            var temp = []
            setSentRes.map(result => {
              if((result.text.toLowerCase().includes(" " + val) || result.text.toLowerCase().indexOf(val) === 0 || result.text.toLowerCase().includes('"' + val)) &&
              !isLetter(result.text.at( result.text.toLowerCase().indexOf(val) + val.length))) {
                temp.push(result.text)
              }
              return null;
            })
            setDialogTweets(temp)
            if (isActive) {
              handleClickOpen();
            }
          })
          .transition()
          .attr("background", "white")
          .attr("font-weight", isActive ? "bold" : "none")
          .attr("text-decoration", isActive ? "underline" : "none");
      };
    }
    const inputEl = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        var inputVal = inputEl.current.value
        if(inputVal) {
          var sentimentResult = await TwitterAPI(inputVal)
          setSentRes = sentimentResult;
          setSent(sentimentResult)
          if(sentimentResult.length > 0) {
            setTweetsRet(true)
            setMesg("")

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
            setKeyword(inputVal)
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
            setWords(tempWords)

            setCallbacks({
              getWordColor: word => negKeywords[word.text] ? "#f29900" : "#79b68b",
              getWordTooltip: word => `The word "${word.text}" appears ${word.value} times. [${negKeywords[word.text] ? "negative" : "positive"}]`,
              onWordClick: getCallback("onWordClick"),
              onWordMouseOut: getCallback("onWordMouseOut"),
              onWordMouseOver: getCallback("onWordMouseOver"),
            });
          }
          else {
            setTweetsRet(false)
            setMesg("No Tweets Returned for provided keyword.")
          }
      }
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
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <img src={logo2} alt="logo" style={{alignSelf: "flex-start"}}/>
          <div style={{marginRight: `${window.innerWidth/3}px`}}>
          <h1>Enter the name of your business</h1>
          <h3>Determine the public opinion of your company</h3>
          <br/>
          <form onSubmit={handleSubmit} style={{"margin": "auto", "maxWidth": "500px", "position": "relative"}}>
              <div style={{"display":"flex"}}>
              <input ref={inputEl} className="keywordInput" autoComplete='off' type="text" name="keyword"/>
              <button className="keywordBtn" type="button" id="keywordSearchBtn" onClick={handleSubmit}><i id="keywordSearchIcon" className="fa fa-search"></i></button>
              </div>
          </form>
          </div>
          </div>
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
              {dialogTweets.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </DialogContentText>
            </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {keyword !== '' && tweetsRet ?
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
              keyword = {keyword}
              />
          </LoadScript> 
        </div> : <div style={{padding: "5px"}}> 
                  {mesg !== "" && <h2>{mesg}</h2>} 
                  <div className='logo'><img src={logo} alt="logo" className="spin" /></div> 
                </div>
        }
      </div>
    );
  }
  
  export default KeywordSearch;
