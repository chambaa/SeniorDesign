import React from 'react';

async function TwitterAPI(keyword) {
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
          var test = response.json();
          // setMsg(test);
          return test;
        }).then(function(data) {
          // `data` is the parsed version of the JSON returned from the above endpoint.
          console.log(data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    return (
      <div>
      </div>
    );
  }
  
  export default TwitterAPI;