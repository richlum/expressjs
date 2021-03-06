var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveIndex = require('serve-index');

var index = require('./routes/index');
var users = require('./routes/users');
var hostcmd = require('./routes/hostcmd');
var datacmd = require('./routes/datacmd');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var hourMs = 1000*60*60;


app.use('/',serveIndex((__dirname + '/public')));
// orig default to make root url use dir public as root
//app.use(express.static(path.join(__dirname, 'public')));
// url /public mapped to phys dir ./public and hierachal longer url map to phys subdir
app.use('/',express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public'),{maxAge:hourMs}));

// note we could use an array to allow multiple mount paths to sub app route handler.
// the subapp route handler only needs to match the next url segment
app.use('/', index);
app.use('/users', users);
app.use('/hostcmd', hostcmd);
app.use('/datacmd',datacmd);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found ' + req.method + ' ' + req.url );
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
