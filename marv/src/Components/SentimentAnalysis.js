import axios from "axios";
import React, { useState, useEffect }  from 'react';

function SentimentAnalysis() {
    const [sentimentType, setSentimentType] = useState('');
    const [text, setText] = useState('');

    const encodedParams = new URLSearchParams();
    encodedParams.append("text", "I am so happy!");

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

    useEffect(() => {
        axios.request(options).then(function (response) {
            setText(response.data.text);
            if(response.data.pos > 0) {
                setSentimentType("Positive");
            }
            else if(response.data.neg > 0) {
                setSentimentType("Negative");
            }
            else if(response.data.mid > 0) {
                setSentimentType("Neutral");
            }
        }).catch(function (error) {
        console.error(error);
        });

    }, [sentimentType, text])

    return (
      <div className="SentimentAnalysis">
        <h1>{text}</h1>
        <h2>{sentimentType}</h2>
      </div>
    );
  }
  
  export default SentimentAnalysis;