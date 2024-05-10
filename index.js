'use strict';

require('dotenv').config();
const { db } = require('./src/models');
const server = require('./src/server.js');
const PORT = process.env.PORT || 3001



db.sync().then(() => {
  server.start(PORT);
});
// require('dotenv').config();
// const app = require('./src/server.js');
// const { db } = require('./src/auth/users');
//
// db.sync().then(() => {
//   app.start(process.env.PORT || 3001);
// });
