const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// configuration
const config_path = [process.env.NODE_ENV] == 'production'
  ? './config.json'
  : '../config/config.json';
const config = require(config_path)[process.env.NODE_ENV];
// this service
const HOST = config.eventbus.host;
const PORT = config.eventbus.port;
// other services
const POSTS_SERVICE_HOST = config.posts.host;
const POSTS_SERVICE_PORT = config.posts.port;
const COMMENTS_SERVICE_HOST = config.comments.host;
const COMMENTS_SERVICE_PORT = config.comments.port;
const QUERY_SERVICE_HOST = config.query.host;
const QUERY_SERVICE_PORT = config.query.port;
const MODERATION_SERVICE_HOST = config.moderation.host;
const MODERATION_SERVICE_PORT = config.moderation.port;

const app = express();
app.use(bodyParser.json());

const events = [];

app.get('/', (req, res) => {
  res.status(200).send({ response: 'eventbus working' })
});

app.get('/events', (req, res) => {
  res.status(200).send(events);
});

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  // send to:
  // post service
  axios.post(`http://${POSTS_SERVICE_HOST}:${POSTS_SERVICE_PORT}/events`, event).catch((err) => {
    console.log(err.message);
  });

  // comment service
  axios.post(`http://${COMMENTS_SERVICE_HOST}:${COMMENTS_SERVICE_PORT}/events`, event).catch((err) => {
    console.log(err.message);
  });

  // query service
  axios.post(`http://${QUERY_SERVICE_HOST}:${QUERY_SERVICE_PORT}/events`, event).catch((err) => {
    console.log(err.message);
  });

  // moderation service
  axios.post(`http://${MODERATION_SERVICE_HOST}:${MODERATION_SERVICE_PORT}/events`, event).catch((err) => {
    console.log(err.message);
  });

  res.status(200).send({});
});

app.listen(PORT, () => {
  console.log("Listening on 4005");
});
