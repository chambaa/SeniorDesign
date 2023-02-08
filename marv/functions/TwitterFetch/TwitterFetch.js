const fetch = require('node-fetch')
exports.handler = async function(event, context) {
  try {
    const token = "*** ADD BEARER TOKEN ***";
    const headers = {
      "User-Agent": "v2RecentSearchJS",
      "authorization": `Bearer ${token}`,  
    }
    const response = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=${event.body}%20lang%3Aen&max_results=10&tweet.fields=author_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source`, {headers: headers})
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