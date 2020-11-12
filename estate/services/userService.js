let UserModel = require('../models/user.model');
function getUserByIdService(id) {
  return UserModel.findOne({ _id: id });
}

let checkEmailService = (email) => {
  return UserModel.findOne({ email })
}
module.exports = {
  getUserByIdService,
  checkEmailService
}