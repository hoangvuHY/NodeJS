var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
const { createBrotliCompress } = require('zlib');
var session = require("express-session");

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
/**
 * Phải tuân theo thứ tự. passport.initialize --> passport.session --> serializeUser --> deserializeUser
 */
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: '415824132820888',
  clientSecret: '407267bd689c9606030b6c555a198b21',
  profileFields: ['id', 'displayName', 'photos', 'email'],
  callbackURL: "https://14ccaf46c887.ngrok.io/auth/facebook/callback"
},
  function (accessToken, refreshToken, profile, done) {
    /* User.findOrCreate(..., function (err, user) {
      if (err) { return done(err); }
      done(null, user);
    }); */

    console.log(profile);
    return done(null, accessToken);
  }
));

// done(null, profile); 
/**
 * Sau khi hoàn thành  done(null, profile); thì sẽ vào serializeUser
 * serializeUser Mã hóa dữ liệu người dùng vào trong session
 * deserializeUser: Giải mã session đó và lấy thông tin của user
 */
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /* User.findById(id, function (err, user) {
    done(err, user);
  }); */
  done(null, user);
});

app.get('/auth/facebook',
  passport.authenticate('facebook', { authType: 'reauthenticate', scope: ['user_posts'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/home', (req, res, next) => {
  res.json(req.user);
});


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
