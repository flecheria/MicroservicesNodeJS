const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

// configuration
const config_path = [process.env.NODE_ENV] == 'production'
  ? './config.json'
  : '../config/config.json';
const config = require(config_path)[process.env.NODE_ENV];
const HOST = config.query.host;
const PORT = config.query.port;
const EVENTBUS_SERVICE_HOST = config.eventbus.host;
const EVENTBUS_SERVICE_PORT = config.eventbus.port;

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {

};

app.get('/', (req, res) => {
  res.status(200).send({ response: 'query working' })
});

app.get('/posts', (req, res) => {
  res.status(200).send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  // if (type === "PostCreated") {
  //   const { id, title } = data;

  //   posts[id] = { id, title, comments: [] }
  // }

  // if (type === "CommentCreated") {
  //   const { id, content, postId, status } = data;

  //   const post = posts[postId];
  //   post.comments.push({ id, content, status });
  // }

  // if (type === "CommentUpdated") {
  //   const { id, content, postId, status } = data;
  //   // console.log(data);
  //   const post = posts[postId];
  //   // console.log(post);
  //   const comment = post.comments.find(c => {
  //     return c.id === id
  //   });
  //   comment.content = content
  //   comment.status = status;
  // }

  // if (type === "Reset") {
  //   posts = {};
  // }

  res.status(201).send({});
});

const handleEvent = (type, data) => {

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] }
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    // console.log(data);
    const post = posts[postId];
    // console.log(post);
    const comment = post.comments.find(c => {
      return c.id === id
    });
    comment.content = content
    comment.status = status;
  }

  if (type === "Reset") {
    posts = {};
  }

}

app.listen(PORT, async () => {
  console.log(`Listening on ${PORT}`);

  try {
    const res = await axios.get(`http://${EVENTBUS_SERVICE_HOST}:${EVENTBUS_SERVICE_PORT}/events`);

    for (let event of res.data) {
      console.log('Processing event: ', event.type);
      handleEvent(event.type, event.data);
    }
  } catch (err) {
    console.log(err.message);
  }

});
