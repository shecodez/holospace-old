const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  // API routes
  app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    app.use('/api', require('./api/'+file));
  });

  // APP routes
  /*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
  });
  fs.readdirSync(__dirname + '/app/').forEach((file) => {
    app.use('/', require('./app/'+file));
  });*/
};
