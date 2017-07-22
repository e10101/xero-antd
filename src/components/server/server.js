const Express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Webpack Requirements
const webpack = require('webpack');
const config = require('../webpack.config.dev');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// Initialize the Express App
const app = new Express();

// // Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../static/index.html'));
})


// // React And Redux Setup
// import { configureStore } from '../client/store';
// import { Provider } from 'react-redux';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { match, RouterContext } from 'react-router';
// import Helmet from 'react-helmet';

// Import required modules
const dummyData = require('./dummyData');
const apiRoutes = require('./routes/index');
const serverConfig = require('./config');

// Set native promises as mongoose promise
// mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  dummyData();
});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
app.use('/api', apiRoutes);

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Running on port: ${serverConfig.port}!`); // eslint-disable-line
  }
});
