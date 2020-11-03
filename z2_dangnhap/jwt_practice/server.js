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
                    token: token
                })
            } else {
                console.log('B can dang nhap');
            }
        })
        .catch(err => res.json('Server Error'));
});


var checkLogin = (req, res, next) => {
    var token = req.cookies.token;
    try {
        var data = jwt.verify(token, 'idUser');
        AccountModels.findById(data._id)
            .then((data) => {
                if (data) {
                    req.data = data;
                    next();
                } else {
                    res.redirect('/login');
                    alert("Ban chua dang nhap");
                }
            })
            .catch(err => res.status(5000).json("ERROR SERVER" + err));
    } catch (error) {
        console.log(error);
    }
};
var checkStudent = (req, res, next) => {
    var role = req.data.role;
    console.log(req.data.role);
    if (role >= 1) {
        next();
    } else {
        res.json("NOT PERMISSION");
    }
}
var checkTeacher = (req, res, next) => {
    var role = req.data.role;
    if (role >= 2) {
        next();
    } else {
        res.json("NOT PERMISSION");
    }
}
var checkManager = (req, res, next) => {
    var role = req.data.role;
    if (role >= 3) {
        next();
    } else {
        res.json("NOT PERMISSION");
    }
}

app.get('/task', checkLogin, checkStudent, (req, res, next) => {
    res.json('STUDENT ')
});
app.get('/teacher', checkLogin, checkTeacher, (req, res, next) => {
    res.json('TEACHER ')
});
app.get('/manager', checkLogin, checkManager, (req, res, next) => {
    res.json('MANAGER ')
});
app.listen(3000, () => {
    console.log('Server start');
});