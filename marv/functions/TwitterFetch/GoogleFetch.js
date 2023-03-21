const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const url = `https://maps.googleapis.com/${event.path.replace('/api/', '')}`;
  const params = event.queryStringParameters || {};
  params.key = "AIzaSyBgt_ybrpI0hzarHDx7Og1LkV5mS8lheQw";

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const response = await fetch(`${url}?${new URLSearchParams(params)}`, {
    headers,
  });

  const data = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
};