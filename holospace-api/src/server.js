import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import bluebird from 'bluebird';

import auth from './routes/auth';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', auth);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

//app.listen(8080, () => console.log('Running on localhost:8080'));
const server = app.listen(8080, function() {
  mongoose.Promise = bluebird;
  mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

  var db = mongoose.connection;
  db.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  db.once('open', () => {
    console.log('Express server listening on %d, in %s mode', 8080, app.get('env'));
  });
});
