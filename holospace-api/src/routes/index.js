const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  // API routes
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    app.use('/api', require('./api/'+file));
  });
};
