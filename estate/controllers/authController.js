// Login, register
let {
  signUpService,
} = require('../services/authServices')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


let signUpController = async (req, res) => {
  try {
    // let user = await signUpService(req.body); 
    console.log("signUpController: ", req.body);
    await signUpService(req.body);
    return res.json({
      error: false,
      status: 200,
      message: "Đăng ký thành công"
    })
  } catch (error) {
    if (error) {
      return res.json({
        error: true,
        status: 400,
        message: "Đăng ký không thành công"
      });
    }
  }
}

let loginController = (req, res) => {
  bcrypt.compare(req.body.password, req.user.password, function (err, results) {

    if (err) {
      return res.json({
        error: true,
        status: 500,
        message: "Lỗi server"
      });
    }
    if (!results) {
      console.log('Chay vao dauy');
      return res.json({
        error: false,
        status: 400,
        message: "Sai password"
      });
    } else {

      // mã hóa id người dùng vào cookie và lưu vào cookie
      var token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 * 1 })
      req.user["password"] = undefined;
      return res.status(200).json({
        error: false,
        status: 200,
        message: "Bạn đã đăng nhập thành công",
        data: {
          user: req.user
        }
      });
    }
  })

}

let checkAuthController = (req, res) => {
  var user = req.userLocal
  if (user.role === "admin") {
    return res.render("homeAdmin");
  }
  if (user.role === "owner") {
    return res.render("homeOwner");
  }
  if (user.role === "user") {
    return res.render("homeUser");
  }
}

module.exports = {
  signUpController,
  loginController,
  checkAuthController
}