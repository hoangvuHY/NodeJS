require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//bodyParser
var bodyParser = require('body-parser');
var app = express();
var jwt = require('jsonwebtoken')
var jwtComponent = require('./util/jwtComponent')

var connectDB = require('./config/dbConnect');
connectDB();


//bodyParser   
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/get-token', (req, res) => {
  // console.log(req.headers.authorization.split(' ')[1]);

  var token = req.body.token || req.headers.authorization;
  console.log(token);
  jwtComponent.verifyJWT(token, process.env.JWT_SECRET);

  // console.log(data);
})




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

module.exports = app;
