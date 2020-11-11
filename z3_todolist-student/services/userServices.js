let UserModel = require('../models/user.model');
function signUp(email, username, password, role) {
  return UserModel.create({
    email, username, password, role
  })
}
function login(email, password) {
  return UserModel.findOne({ email, password });
}

function getAllUserService() {
  return UserModel.find();
}
function getDetailUserService(id) {
  return UserModel.findById(id);
}
function updateUserService(id, email, username, password, age) {
  var newUser = {};
  if (email) newUser.email = email;
  if (username) newUser.username = username;
  if (password) newUser.password = password;
  if (age) newUser.age = age;

  return UserModel.updateOne({ _id: id }, newUser);
}
function deleteUserService(id) {
  return UserModel.deleteOne({ _id: id });
}
// Kiểm tra để login
function checkEmail(email) {
  return UserModel.findOne({ email })
}
// Kiểm tra để xem có trùng lặp không
function checkUser(email) {
  return UserModel.findOne({ email })
}
// Kiểm tra id
function checkId(id) {
  return UserModel.findOne({ _id: id })
}


module.exports = {
  signUp,
  login,
  getAllUserService,
  getDetailUserService,
  updateUserService,
  deleteUserService,
  checkEmail,
  checkUser,
  checkId
}