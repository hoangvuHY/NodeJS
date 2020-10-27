var express = require('express');
var router = express.Router();
const AccountModels = require('../models/account');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'Home' });
});
/* GET home page. */
router.get('/register', function(req, res, next) {
    res.render('index', { title: 'Register' });
});
/* GET home page. */
router.post('/register', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    AccountModels.findOne({ username: username })
        .then((data) => {
            if (data) { // Neu ma tim thay se tra ve data
                res.json("Da ton tai tai khoan")
            } else {
                return AccountModels.create({
                    username: username,
                    password: password
                });
            }
        }).then((data) => {
            // res.render('login', { title: 'Login' })
            res.redirect('/login');
        }).catch((err) => { res.status(500).json('Fail') })
});
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});
router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    AccountModels.findOne({ username: username, password: password })
        .then((data) => {
            if (data) {
                // res.render('home', { title: 'Home' })
                res.redirect('/')
            } else {
                res.json('Tai khoan hoac mat khau khong chinh xac')
            }
        }).catch((err) => { res.status(500).json('Fail') });
    // res.render('index', { title: 'Register' });
});
module.exports = router;