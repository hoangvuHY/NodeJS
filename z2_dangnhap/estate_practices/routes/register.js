var express = require('express');
var router = express.Router();
var AccountModels = require('../models/Account');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('register', { title: 'Express' });
}); 
/* GET home page. */
router.post('/', function (req, res, next) {
  var fullName = req.body.fullName,
    identification = req.body.identification,
    address = req.body.address,
    phone = req.body.phone,
    email = req.body.email,
    password = req.body.password,
    role = req.body.role;
  AccountModels.create({
    fullName: fullName,
    identification: identification,
    address: address,
    phone: phone,
    email: email,
    password: password,
    role: role
  }) 
 
});

module.exports = router;
