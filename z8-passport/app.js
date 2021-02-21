var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const Account = require('./model/account')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
  res.render('index');
})

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    // done <=> callback
    /*   User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      }); */

    /* 
      Email: user123@gmail.com
      password: 1
    */

    Account.findOne({ email, password })
      .then((data) => {
        if (!data) { done(null, false) }
        done(null, data);
      }).catch((err) => {
        console.log(err);
        done(err);
      });
  }
));

app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    // Sau khi qua passport thì sẽ nhảy vào trong này
    // Tiếp đó thì sẽ xử lý logic theo hàm done 
    try {
      if (err) return res.json(err)
      console.log(user);
      if (!user) { return res.json("Email or password no match"); }
      req.user = user;
      const token = jwt.sign(user.toObject(), '123');
      return res.json(token);
    } catch (error) {
      console.log(error);
    }

  })(req, res, next);
});
app.get('/private', (req, res, next) => {
  var token = req.headers['authorization'].split(' ')[1];
  jwt.verify(token, '123', (err, data) => {
    if (err) return res.json('error server');
    next();
  })
}, (req, res) => {
  return res.json("Data private")
})


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

module.exports = app;
