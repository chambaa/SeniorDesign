import axios from "axios";
import React from 'react';

async function SentimentAnalysis(twitterData) {
    const promises = [];
  
    for (const tweet of twitterData.data.data) {
        var text = tweet.text;
        const encodedParams = new URLSearchParams();
        encodedParams.append("text", text);
    
        const options = {
            method: 'POST',
            url: 'https://text-sentiment.p.rapidapi.com/analyze',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '74846fce23msh7e41880fdd46e30p10527cjsnd38522cd9765',
                'X-RapidAPI-Host': 'text-sentiment.p.rapidapi.com'
            },
            data: encodedParams
        };
        promises.push(axios.request(options));
    }
  
    const responses = await Promise.all(promises);
  
    const data = [];
  
    for (const response of responses) {
        if(response.data.pos > 0) {
            var objPos = {
                "text": response.data.text,
                "sentiment": "Positive"
            }
            data.push(objPos);
        }
        else if(response.data.neg > 0) {
            var objNeg = {
                "text": response.data.text,
                "sentiment": "Negative"
            }
            data.push(objNeg);
        }
        else if(response.data.mid > 0) {
            var objMid = {
                "text": response.data.text,
                "sentiment": "Neutral"
            }
            data.push(objMid);
        }
    }
  
    return data;
  }
  
  export default SentimentAnalysis;