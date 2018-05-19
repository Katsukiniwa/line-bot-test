require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
// const axios = axiosBase.create({
//   baseURL: 'https://api.line.me/v2/bot/message/reply',
//   headers: {
//     'ContentType': 'application/json',
//     'Authorization': `${Bearer} ${LINE_CHANNEL_ACCESS_TOKEN}`,
//     'X-Requested-With': 'XMLHttpRequest'
//   },
//   responseType: 'json'
// });
const app = express();

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const A3RT_API_KEY = process.env.A3RT_API_KEY;

app.post('/webhook', (req, res, next) => {
  res.status(200).end();

  req.body.events.forEach(async event => {
    const replyMessage = await getReplyMessage();
    const body = {
      replyToken: event.replyToken,
      messages: [{
        type: 'text',
        text: replyMessage
      }]
    };
    reply(body);
  });
});

const getReplyMessage = async query => {
  const url = `https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk`;
  const postData = {
    apikey: A3RT_API_KEY,
    query
  };
  const result = await axios.post(url, postData);

  return result.message;
}

const reply = body => {
  const url = 'https://api.line.me/v2/bot/message/reply';
  request({
    url: url,
    method: 'POST',
    headers: headers,
    body: body,
    json: true
  });

  axios.post(url, body);
}
