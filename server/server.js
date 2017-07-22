const Express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the Express App
const app = new Express();

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Import required modules
const dummyData = require('./dummyData');
const apiRoutes = require('./routes/index');
const serverConfig = require('./config');

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

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
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/api', apiRoutes);

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Running on port: ${serverConfig.port}!`); // eslint-disable-line
  }
});
