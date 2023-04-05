const fetch = require('node-fetch')
exports.handler = async function(event, context) {
  try {
    const token = "AAAAAAAAAAAAAAAAAAAAAKu0jAEAAAAA6%2Bju4OgNTnfOFFT9bFGb41U8Bpw%3DdFAhQWTkPeohazao2Ryd2BvCcx5GBTJZuFpSKgxq3YEPL0egbs";
    const headers = {
      "User-Agent": "v2RecentSearchJS",
      "authorization": `Bearer ${token}`,  
    }
    // Change max_results=10 to 100 to fetch more
    var searchedPhrase = event.body.replace("&", "and")
    const response = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=-is%3Aretweet%20"${searchedPhrase}"%20lang%3Aen&tweet.fields=author_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source&max_results=10`, {headers: headers})
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ data: data })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}