const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// configuration
const config_path = [process.env.NODE_ENV] == 'production'
  ? './config.json'
  : '../config/config.json';
const config = require(config_path)[process.env.NODE_ENV];
const HOST = config.moderation.host;
const PORT = config.moderation.port;
const EVENTBUS_SERVICE_HOST = config.eventbus.host;
const EVENTBUS_SERVICE_PORT = config.eventbus.port;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({ response: 'moderation working' })
});

app.post('/events', async (req, res) => {

  const { type, data } = req.body;
  console.log('Moderation receive event: ', type);

  if (type === "CommentCreated") {
    const status = data.content.includes('orange') ?  'rejected' : 'approved';
    console.log(status);

    // send to eventbus
    await axios.post(`http://${EVENTBUS_SERVICE_HOST}:${EVENTBUS_SERVICE_PORT}/events`, {
      type: 'CommentModerated',
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId, 
        status
      }
    });

    res.status(201).send({});
   }

});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
