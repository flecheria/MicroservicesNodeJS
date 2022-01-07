const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {
  "e0719641": {
    "id": "e0719641",
    "title": "qui"
  },
  "a0e17742": {
      "id": "a0e17742",
      "title": "quo"
  },
  "92d56d19": {
      "id": "92d56d19",
      "title": "No Title"
  },
  "9a0c1a2d": {
      "id": "9a0c1a2d",
      "title": "Qua"
  }
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
  console.log('Event type: ', req.body.type);

  const { type, data } = req.body;

  if(type === "Reset") {
    posts = {};
  }

  res.status(201).send({});
});

// app.post('/posts/delete', (req, res) => {
//   if (req.query.all) {
//     posts = {};
//   }

//   res.status(201).send({});
// });

app.listen(4000, () => {
  console.log('Listening on 4000');
});
