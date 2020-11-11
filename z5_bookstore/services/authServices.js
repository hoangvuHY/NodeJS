let UserModel = require('../models/user.model');
let bcrypt = require('bcrypt');
const saltRounds = 10;
let signUpService = (infoUser) => {
  let { username, password, email } = infoUser;
  // console.log(infoUser.password);
  //Mã hóa Password người dùng 
  if (password && username) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    // console.log(hash);
    // console.log(username, password, hash);
    return UserModel.create({ email, password: hash, username })
  } else {
    throw "Error"
  }

}

let checkEmailService = (email) => {
  return UserModel.findOne({ email })
}

module.exports = { signUpService, checkEmailService }