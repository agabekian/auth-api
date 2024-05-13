'use strict';

require('dotenv').config();

const { db } = require('./src/models'); //1 db

const server = require('./src/server.js'); //2 srv

const PORT = process.env.PORT || 3001 //le port



db.sync().then(() => server.start(PORT | 3000));
