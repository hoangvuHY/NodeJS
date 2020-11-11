var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/sign-up', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/signup.html'))
})

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/home.html'))
})
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'))
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
