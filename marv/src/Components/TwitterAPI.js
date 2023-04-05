import React from 'react';
import SentimentAnalysis from './SentimentAnalysis';

async function TwitterAPI(keyword) {
  var dataTest;
        await fetch("/.netlify/functions/TwitterFetch", {     
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            accept: "Accept: application/json"
          },
          redirect: 'follow', 
          referrerPolicy: 'no-referrer',
          body: keyword // Send the proxy the keyword
        },)
        .then(function(response) {
          // The response is a Response instance.
          // You parse the data into a useable format using `.json()`
          var resJson = response.json();
          return resJson;
        }).then(function(data) {
          // `data` is the parsed version of the JSON returned from the above endpoint.
          console.log(data);
          dataTest = data;
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        if(dataTest.data.meta.result_count > 0) {
          return await SentimentAnalysis(dataTest);
        }
        else {
          return []
        }
  }
  
  export default TwitterAPI;