var express = require('express');
var app = express();
const path = require('path');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
const AccountModels = require('./models/Account');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'login.html'))
});
app.post('/login', (req, res, next) => {
    var username = req.body.username,
        password = req.body.password;
    AccountModels.findOne({ username: username, password: password })
        .then((data) => {
            // console.log(data);
            var token = jwt.sign({ _id: data._id }, 'idUser');
            // console.log(token);
            if (data) {
                return res.json({
                    mess: 'Success',
                    token: token,
                    username: data.username
                })
            } else {
                console.log('B can dang nhap');
            }
        })
        .catch(err => res.json('Server Error'));
});
app.get('/private', (req, res, next) => {
    var token = req.cookies.token;


    if (token) {
        var data = jwt.verify(token, 'idUser');
        console.log(data);
        next();
    } else {
        res.redirect('/login');
    }
}, (req, res, next) => {
    res.json('welcome: ')
});
app.listen(3000, () => {
    console.log('Server start');
});