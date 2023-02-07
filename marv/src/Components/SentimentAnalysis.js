import axios from "axios";
import React from 'react';

function SentimentAnalysis(twitterData) {
    var optionsArray = [];
    var objects = [];

    twitterData.data.data.map(tweet => {
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
        optionsArray.push(options)
    })

    optionsArray.map(options => {
        axios.request(options).then(function (response) {
            if(response.data.pos > 0) {
                var obj = {
                    "text": response.data.text,
                    "sentiment": "Positive"
                }
                objects.push(obj);
            }
            else if(response.data.neg > 0) {
                var obj = {
                    "text": response.data.text,
                    "sentiment": "Negative"
                }
                objects.push(obj);
            }
            else if(response.data.mid > 0) {
                var obj = {
                    "text": response.data.text,
                    "sentiment": "Neutral"
                }
                objects.push(obj);
            }

        }).catch(function (error) {
        console.error(error);
        });

    })
    console.log(objects)


    return (
      <div className="SentimentAnalysis">
      </div>
    );
  }
  
  export default SentimentAnalysis;