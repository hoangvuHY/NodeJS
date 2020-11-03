var express = require('express');
var app = express();
const path = require('path');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
const AccountModels = require('./models/Account')
app.use(bodyParser.urlencoded({ extended: false }));
var cookieParser = require('cookie-parser')
    // parse application/json
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

//get login
app.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'login.html'));
})

//post login
app.post('/login', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    AccountModels.findOne({
            username: username,
            password: password
        })
        .then((data) => {
            if (data) {
                var token = jwt.sign({
                    _id: data._id
                }, 'mk');
                return res.json({
                    message: 'thanh cong',
                    token: token
                });
            } else {
                res.json("That bai")
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Server error");
        })
})


app.get('/task', (req, res, next) => {
    //check
    try {
        // var token = req.params.token;
        var token = req.cookies.token;
        var data = jwt.verify(token, 'mk');
        if (data) {
            next();
        }
    } catch (error) {
        res.redirect('/login');
    }
}, (req, res, next) => {
    res.json('ALL TASK')
}, )
app.get('/student', (req, res, next) => {
    next()
}, (req, res, next) => {
    res.json('STUDENT')
}, )
app.get('/teacher', (req, res, next) => {
    next()
}, (req, res, next) => {
    res.json('TEACHER')
}, )
app.listen(3000, () => {
    console.log('Server start');
});