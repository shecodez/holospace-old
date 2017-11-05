import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import bluebird from 'bluebird';

import auth from './routes/auth';

dotenv.config();

const app = express();

/*
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', (socket) {
  console.log('connection established.');
  socket.on("new-message", (message) =>{
    console.log(message);
    io.emit("receive-message", message);
  });
});

http.listen('2000', () => {
  console.log('connected');
});
*/

app.use(bodyParser.json());

app.use('/api/auth', auth);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 8080;
//app.listen(port, () => console.log('Running on localhost:'+port));
const server = app.listen(port, function() {
  mongoose.Promise = bluebird;
  mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

  var db = mongoose.connection;
  db.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
  db.once('open', () => {
    console.log('Express server listening on %d, in %s mode', port, app.get('env'));
  });
});
