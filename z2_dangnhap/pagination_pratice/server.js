var express = require('express');
var app = express();
const path = require('path');
var bodyParser = require('body-parser');
const UserModel = require('./models/User')
const PAGE_SIZE = 3;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/home', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/user', function(req, res, next) {
    // res.json('Home');
    var page = req.query.page;
    page = parseInt(page);
    var skipPage = (page - 1) * PAGE_SIZE;
    if (page) {
        if (page < 1) {
            page = 1;
        }
        UserModel.find({})
            .skip(skipPage)
            .limit(PAGE_SIZE)
            .then((data) => {

                UserModel.countDocuments().then((total) => {
                    // if (err) res.json(err);
                    var totalPage = Math.ceil(total / PAGE_SIZE);
                    res.json({
                        total: total,
                        totalPage: totalPage,
                        data: data
                    })
                });

                // res.json(data);
            })
            .catch((err) => {
                res.status(500).json('Error server');
            });
    } else {
        UserModel.find({})
            .then((data) => {
                UserModel.countDocuments().then((total) => {
                    // if (err) res.json(err);
                    var totalPage = Math.ceil(total / PAGE_SIZE);
                    res.json({
                        total: total,
                        totalPage: totalPage,
                        data: data
                    })
                });
            })
            .catch((err) => {
                res.status(500).json('Error server');
            });
    }
});


app.listen(3000, () => {
    console.log('Server start');
});