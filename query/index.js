const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {

};

app.get('/posts', (req, res) => {
  res.status(200).send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

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
    console.log(data);
    const post = posts[postId];
    console.log(post);
    const comment = post.comments.find(c => {
      return c.id === id
    });
    comment.content = content
    comment.status = status;
  }

  if (type === "Reset") {
    posts = {};
  }

  res.status(201).send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
