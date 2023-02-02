import axios from "axios";
import React, { useState, useEffect }  from 'react';
import data from "./testdata.json"

function SentimentAnalysis() {
    const [sentimentType, setSentimentType] = useState('');
    const [text, setText] = useState('');
    var optionsArray = [];
    var objects = [];

    data.results.map(tweet => {
        var text = tweet[5]
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

    useEffect(() => {
        optionsArray.map(options => {
            axios.request(options).then(function (response) {
                // setText(response.data.text);
                if(response.data.pos > 0) {
                    // setSentimentType("Positive");
                    var obj = {
                        "text": response.data.text,
                        "sentiment": "Positive"
                    }
                    objects.push(obj);
                }
                else if(response.data.neg > 0) {
                    // setSentimentType("Negative");
                    var obj = {
                        "text": response.data.text,
                        "sentiment": "Negative"
                    }
                    objects.push(obj);
                }
                else if(response.data.mid > 0) {
                    // setSentimentType("Neutral");
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

    }, [sentimentType, text, optionsArray])



    return (
      <div className="SentimentAnalysis">
        <h1>{text}</h1>
        <h2>{sentimentType}</h2>
      </div>
    );
  }
  
  export default SentimentAnalysis;