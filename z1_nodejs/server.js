const express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router1 = require('./apiRouter');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
    // var checkAdmin = (req, res, next) => {
    //     // res.json('router1')
    //     if (dangnhap) {
    //         user.role = 'admin';
    //     } else {
    //         res.json('ban chua dang nhap');
    //     }
    // }
    // var checkDangNhap = (req, res, next) => {
    //     // res.json('router1')
    //     if (dangnhap) {
    //         // user.role = 'admin';
    //         req.user.role;
    //         next();
    //     } else {
    //         res.json('ban chua dang nhap');
    //     }
    // }

// app.get('/', checkDangNhap, (req, res, next) => {
//     console.log('Home1');
//     next();
// }, (req, res, next) => {
//     // console.log('Home2');
//     res.json('end')
//     next();
// }, (req, res, next) => {
//     console.log('Home3');

// });

app.use('/admin/api/v1', router1);
app.listen(3000, () => {
    console.log('Server start!');
});