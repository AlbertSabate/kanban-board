const path = require('path');

module.exports = (express, app) => {
  app.use(express.static(path.join(__dirname, '../app/dist')));
};
