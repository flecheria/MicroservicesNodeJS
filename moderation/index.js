const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

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
    await axios.post('http://localhost:4005/events', {
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

app.listen(4003, () => {
  console.log('Listening on 4003');
});
