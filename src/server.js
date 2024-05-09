'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
// const authRoutes = require('./routes/v2.js');
// Routes
// app.use(authRoutes);

// Catchalls
app.use('*', notFoundHandler);
app.use(errorHandler);


module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};