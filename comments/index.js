const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let commentsByPostId = {
  "92d56d19": [
    {
      "id": "e76ce528",
      "content": "231"
    }
  ],
  "a0e17742": [
    {
      "id": "764cf4d7",
      "content": "4345353"
    }
  ],
  "e0719641": [
    {
      "id": "bd158d3f",
      "content": "345345"
    }
  ],
  "9a0c1a2d": [
    {
      "id": "28fd957d",
      "content": "9879789"
    }
  ]
};

app.get('/posts/:id/comments', (req, res) => {
  res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.get('/comments', (req, res) => {
  res.status(200).send(commentsByPostId);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: 'pending' });

  commentsByPostId[req.params.id] = comments;

  // send to eventbus
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id, 
      status: 'pending'
    }
  });

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Event type: ', req.body.type);

  const { type, data } = req.body;

  if (type === "Reset") {
    commentsByPostId = {};
  }

  res.status(201).send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
