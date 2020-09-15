var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var session = require('express-session');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: 'VuOppa',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.use(express.static(path.join(__dirname, 'public')));
app.use("/stylesheets", express.static(path.join(__dirname, '/stylesheets')));
app.use("/js", express.static(path.join(__dirname, '/js')));
app.use("/plugins", express.static(path.join(__dirname, '/plugins')));
app.use("/images", express.static(path.join(__dirname, '/images')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.locals.data = require('./model/data.json')

module.exports = app;
