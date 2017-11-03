import express from 'express';
import path from 'path';
//import mongoose from 'mongoose';
import config from './config';

const app = express();

app.post('/api/auth', (req, res) => {
  res.status(400).json({ errors: { global: "Invalid credentials"} });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(8080, () => console.log('Running on localhost:8080'));

/*const server = app.listen(config.port, function() {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db.uri, { useMongoClient: true });

  var db = mongoose.connection;
  db.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  db.once('open', () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
});*/
