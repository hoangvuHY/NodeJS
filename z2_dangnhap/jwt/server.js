var express = require('express');
var app = express();
const path = require('path');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
const AccountModels = require('./models/Account')
app.use(bodyParser.urlencoded({ extended: false }));
var cookieParser = require('cookie-parser');
const e = require('express');
// parse application/json
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

//get login
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})
//get login
app.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'login.html'));
})

//post login
app.post('/login', (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  console.log(username);
  console.log(password);
  AccountModels.findOne({
    username: username,
    password: password
  })
    .then((data) => {
      console.log(data);
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


var checkLogin = (req, res, next) => {
  //check 
  try {

    var token = req.cookies.token;
    var data = jwt.verify(token, 'mk');
    AccountModels.findById(data._id)
      .then((data) => {
        if (data) {
          req.data = data;
          next()
        } else {
          res.json("NOT PERMISSION")
        }
      })
  } catch (error) {
    res.status(500).json("Error Server: " + error)
  }
}
var checkStudent = (req, res, next) => {
  var role = req.data.role;
  if (role >= 1) {
    next();
  } else {
    res.json("NOT PERMISSION")
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
    res.json("NOT PERMISSION")
  }
}
app.get('/task', checkLogin, checkStudent, (req, res, next) => {
  console.log(req.data);
  res.json('ALL TASK')
});
app.get('/student', checkLogin, checkTeacher, (req, res, next) => {
  next()
}, (req, res, next) => {
  res.json('STUDENT')
});
app.get('/teacher', checkLogin, checkManager, (req, res, next) => {
  next()
}, (req, res, next) => {
  res.json('TEACHER')
});
app.listen(3000, () => {
  console.log('Server start');
});