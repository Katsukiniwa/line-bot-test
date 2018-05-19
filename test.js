require('dotenv').config()
const axios = require('axios');
const A3RT_API_KEY = process.env.A3RT_API_KEY;

const getReplyMessage = async query => {
  const url = `https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk`;
  const postData = {
    apikey: A3RT_API_KEY,
    query
  };
  const result = await axios.post(url, postData);

  return result.message;
}

const test = async () => {
  console.log(A3RT_API_KEY);
  const text = await getReplyMessage('hello').catch(e => e);
  console.log(text);
}

test();