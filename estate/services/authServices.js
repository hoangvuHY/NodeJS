let UserModel = require('../models/user.model');
let bcrypt = require('bcrypt');
const saltRounds = 10;
let signUpService = (infoUser) => {
  let {
    identification,
    address,
    phone,
    birthday,
    name,
    role,
    username,
    password,
    email
  } = infoUser;
  //Mã hóa Password người dùng 
  if (password && username) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return UserModel.create({ email, password: hash, username, identification, address, phone, birthday, name, role, })
  } else {
    throw "Error"
  }

}

module.exports = { signUpService }