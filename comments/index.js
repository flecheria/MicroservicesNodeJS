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
const HOST = config.comments.host;
const PORT = config.comments.port;
const EVENTBUS_SERVICE_HOST = config.eventbus.host;
const EVENTBUS_SERVICE_PORT = config.eventbus.port;

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
  await axios.post(`http://${EVENTBUS_SERVICE_HOST}:${EVENTBUS_SERVICE_PORT}/events`, {
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
    await axios.post(`http://${EVENTBUS_SERVICE_HOST}:${EVENTBUS_SERVICE_PORT}/events`, {
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

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
