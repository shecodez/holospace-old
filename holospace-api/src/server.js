/**
 * Module Dependencies
**/
import express from 'express';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bluebird from 'bluebird';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Create Express app
**/
const app = express();

/**
 * Setup middleware
**/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));

/**
 * Routes/Routing
**/
app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
require('./routes')(app);

/**
 * Start Server, & Connect to DB
 **/
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  mongoose.Promise = bluebird;
  mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

  var db = mongoose.connection;
  db.on('error', (err) => {
    console.error(err); process.exit(1);
  });
  db.once('open', () => {
    console.log('Express server listening on %d, in %s mode', port, app.get('env'));
  });
});

/**
 * Error Handling
**/
app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'});
});

module.exports = app;
