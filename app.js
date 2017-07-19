
// intializations
require('./config/config');


var express = require('express')
  , path = require('path')
  , favicon = require('serve-favicon');

var logger = require('morgan')
  , cors = require('cors')
  , mongoose = require('mongoose');
  
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Database Connectivity
var port = process.env.PORT || 3002;
mongoose.Promise = require('bluebird'); // implement if mongoose mpromise will deprecate
mongoose.connect(MONGO_CONNECT);

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(express.static(path.join(__dirname + '/public')));
app.use('/views', express.static(path.join(__dirname + '/views')));
app.use(express.static(path.join(__dirname, 'ngApp')));
app.use(express.static(path.join(__dirname + '/')));


// Starting index.html file 
app.get('*', function(req, res) {
  res.status(200).sendfile('./index.html');
});


// REST-APIs routes
app.use(cors());
app.use('/api',  require(CONF_ROOT+'routes'));



// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;