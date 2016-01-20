'use strict';

/*
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
var cors = require('cors');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var errorHandler = require('errorhandler');
var path = require('path');
var mongoose = require('mongoose');
var socketIO = require('./socket/socket');

/*
 * App configs
 */
var config = require('./config/config');
var validate = require('./config/validation');
var winstonConfig = require("./config/winston");

/*
 * Create Express server.
 */
var app = express();

app.use(morgan('dev', {"stream": winstonConfig.stream}));


/*
 * Connect to MongoDB.
 */
mongoose.connect(config.mongoDBUrl);
mongoose.connection.on('connected', function() {
  console.log('MongoDB connected succesfully at: ' + config.mongoDBUrl);
});

mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

/*
 * Express configuration.
 */
app.set('port', config.port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

app.use(cors());
require('./routes')(app);

/*
 * DEPRECATED. Please move these routes to routes.js
 * and modify the ./routes files accordingly
 */
var user = require('./routes/user');
var product = require('./routes/product');
var auth = require('./routes/auth');

/*
 * Disable api auth if were are in dev mode
 */
if(app.get('env') !== 'development') {
  app.use('/api/*', validate);
}

app.use('/auth', auth);
app.use('/api', user);
app.use('/api', product);

/*
 * Error Handler.
 */
app.use(errorHandler());

var server = require('http').createServer(app);
var io = require('socket.io')(server)
server.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode',
    app.get('port'),
    app.get('env'));
});

/*
 * Create Socket.io server.
 */
var server = socketIO.createServer(io);

module.exports = app;
