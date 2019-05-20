const cors = require('cors');

module.exports = app => {
  app.use(cors());
  app.use(require('body-parser').text());
};
