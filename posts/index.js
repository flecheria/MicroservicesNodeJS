const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

// configuration
const config_path = [process.env.NODE_ENV] == 'production'
  ? './config.json'
  : '../config/config.json';
const config = require(config_path)[process.env.NODE_ENV];
const HOST = config.posts.host;
const PORT = config.posts.port;
const EVENTBUS_SERVICE_HOST = config.eventbus.host;
const EVENTBUS_SERVICE_PORT = config.eventbus.port;

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {

};

app.get('/', (req, res) => {
  res.status(200).send({ response: 'posts working' })
});

app.get('/posts', (req, res) => {
  res.status(200).send(posts);
});

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title
  };

  // send to eventbus
  await axios.post(`http://${EVENTBUS_SERVICE_HOST}:${EVENTBUS_SERVICE_PORT}/events`, {
    type: 'PostCreated', 
    data: {
      id,
      title
    }
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {

  const { type, data } = req.body;
  console.log('Posts receive event: ', type);

  if(type === "Reset") {
    posts = {};
  }

  res.status(201).send({});
});

app.listen(PORT, () => {
  console.log('Listening on 4000');
});
