var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

/* Post login page. */
router.post('/', function (req, res, next) {
  // console.log(req.body);

  AccountModels.findOne({
    email: req.body.email,
    password: req.body.password
  })
    .then((data) => {
      if (data) {
        console.log(data);
        /*  var token = jwt.sign({ _id: data._id }, 'thisPassword');
         return res.json({
           message: "Success",
           token: token
         }) */
      } else {
        res.json("Ban can dang nhap lai");
      }
    })
    .catch((err) => {
      console.log(err);
      res.json("Server error");
    })
});

module.exports = router;
