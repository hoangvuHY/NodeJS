const { Router } = require('express');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const AccountModels = require('./models/account');
const accountRouter  = require('./router/account');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.post('/register', (req, res, next) => {

    var username = req.body.username;
    var password = req.body.password;
    AccountModels
        .findOne({ username: username })
        .then(data => {
            if (data) {
                res.json('user da ton tai')
            } else {
                return AccountModels.create({
                    username: req.body.username,
                    password: req.body.password
                })

            }
        })
        .then(data => {
            res.json('Create success')

        })
        .catch((err) => {
            res.status(500).json('Create fail')
        })
        /*     AccountModels.create({
                        username: req.body.username,
                        password: req.body.password
                    })
                    .then(data => {
                        res.json('Create success')

                    })
                    .catch((err) => {
                        res.status(500).json('Create fail')
                    }) */
})

app.post('/login', (req, res, next) => {

    var username = req.body.username;
    var password = req.body.password;
    AccountModels.findOne({
            username: username,
            password: password
        })
        .then(data => {
            if (data) {
                res.json('Login success');
            } else {
                res.status(400).json('Not found data')
            }
        })
        .catch((err) => { res.status(500).json('find fail') })
        // res.json('Home');
});

app.get('/', (req, res, next) => {
    res.json('Home');
});



app.use('/api/account/',accountRouter);

app.listen(3000, () => {
    console.log('Server start');
});