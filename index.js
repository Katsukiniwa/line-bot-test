// import modules
require('dotenv').config()
const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const axios = require('axios');

// create a new express server
const app = express()

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const A3RT_API_KEY = process.env.A3RT_API_KEY;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded

const getReplyMessage = async query => {
  const url = `https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk`;
  const data = {
    apikey: A3RT_API_KEY,
    query
  };
  const result = await axios.post(url, data);

  return result.message;
}

app.post('/callback', async (req, res) => {
  const message = await getReplyMessage(req.body.events[0].message.text);
  const options = {
    method: 'POST',
    uri: 'https://api.line.me/v2/bot/message/reply',
    body: {
      replyToken: req.body.events[0].replyToken,
      messages: [{
        type: 'text',
        text: message
      }]
    },
    auth: {
      bearer: LINE_CHANNEL_ACCESS_TOKEN
    },
    json: true
  }
  request(options, (err, response, body) => {
    console.log(JSON.stringify(response))
  })
  res.send('OK')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('server starting on PORT:' + process.env.PORT)
})