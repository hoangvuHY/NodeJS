const express = require('express');
var router = express.Router();
const AccountModels = require('../models/account');

router.get('/', (req, res, next) => {
  AccountModels.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {

    })
});
router.post('/', (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  AccountModels.create({
    username: username, password: password
  })
    .then((data) => {
      res.json('Add username success');
    }).catch((err) => { res.json('Error server') })
});
router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  var newPassword = req.body.newPassword;
  /*   AccountModels.update({
      _id:  id
    }) */
  AccountModels.findByIdAndUpdate(id, { password: newPassword })
    .then((data) => {
      res.json('Update Succuss');
    }).catch((err) => {
      res.json('Server error');
    })
});
router.delete('/:id', (req, res, next) => {
  var id = req.params.id;
  // AccountModels.findByIdAndDelete(id)
  AccountModels.deleteOne({ _id: id })
    .then((data) => {
      res.json('Delete Succuss');
    }).catch((err) => {
      res.json('Server error');
    });
});

module.exports = router;
