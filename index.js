'use strict';

require('dotenv').config();
const { db } = require('./src/models');
const server = require('./src/server.js');
const PORT = process.env.PORT || 3001



db.sync().then(() => server.start(PORT));

// db.sync().then(() => {
//   app.start(process.env.PORT || 3001);
// });
