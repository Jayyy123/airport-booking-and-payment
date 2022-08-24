require('dotenv').config();

const app = require('./src/app');
const express = require('express');

app.set('port', process.env.NODE_PORT);
app.use('/public',express.static('public'));

app.listen(app.get('port'), () => {
  const port = app.get('port');
  console.log('Node Server Running at http://127.0.0.1:' + port);
});
