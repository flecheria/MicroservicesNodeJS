const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let commentsByPostId = {

};

app.get('/', (req, res) => {
  res.status(200).send({ response: 'comments working' })
});

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

app.post('/events', async (req, res) => {

  const { type, data } = req.body;
  console.log('Comments receive event: ', type);

  if (type === "CommentModerated") {
    const {id, content, postId, status} = data;
    console.log(data);

    const comments = commentsByPostId[postId];
    const comment = comments.find(c => {
      return c.id === id
    });
    comment.status = status;

    // send comment updated to eventbus
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        content, 
        postId, 
        status
      }
    });
  }

  if (type === "Reset") {
    commentsByPostId = {};
  }

  res.status(201).send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
