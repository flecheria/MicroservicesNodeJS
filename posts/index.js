const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {

};

app.get('/posts', (req, res) => {
  res.status(200).send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title
  };

  // send to eventbus
  await axios.post('http://localhost:4005/events', {
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

app.listen(4000, () => {
  console.log('Listening on 4000');
});
