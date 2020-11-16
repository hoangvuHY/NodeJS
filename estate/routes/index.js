var express = require('express');
var router = express.Router();
let { checkAuth } = require('../middleware/index');
let { checkAuthController } = require('../controllers/authController')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login');
});
/* GET login page. */
router.get('/register', function (req, res, next) {
  res.render('register');
});
/* GET home page. */
router.get('/home', checkAuth, checkAuthController);
module.exports = router;
