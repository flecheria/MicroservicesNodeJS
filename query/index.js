const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {
  "e0719641": {
    "id": "e0719641",
    "title": "qui",
    "comments": [
      {
        "id": "bd158d3f",
        "content": "345345", 
        "status": 'pending'
      }
    ]
  },
  "a0e17742": {
    "id": "a0e17742",
    "title": "quo",
    "comments": [
      {
        "id": "764cf4d7",
        "content": "4345353", 
        "status": 'pending'
      }
    ]
  },
  "92d56d19": {
    "id": "92d56d19",
    "title": "No Title",
    "comments": [
      {
        "id": "e76ce528",
        "content": "231", 
        "status": 'pending'
      }
    ]
  },
  "9a0c1a2d": {
    "id": "9a0c1a2d",
    "title": "Qua",
    "comments": [
      {
        "id": "28fd957d",
        "content": "9879789", 
        "status": 'pending'
      }
    ]
  }
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

  if (type === "Reset") {
    posts = {};
  }

  res.status(201).send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
