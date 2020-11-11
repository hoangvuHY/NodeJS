let UserModel = require('../models/user.model');
function getUserByIdService(id) {
  return UserModel.findOne({ _id: id });
}

module.exports = {
  getUserByIdService
}