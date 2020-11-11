// Login, register
let {
  signUpService,
} = require('../services/authServices')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


let signUpController = async (req, res) => {
  try {
    let user = await signUpService(req.body);
    console.log(user);
    return res.status(200).json({
      error: false,
      status: 200,
      message: "Đăng ký thành công"
    })
  } catch (error) {
    console.log(error);
    if (error) {
      return res.status(400).json({
        error: true,
        status: 400,
        message: "Đăng ký không thành công"
      });
    }
  }
}

let loginController = (req, res) => {
  // req.user = {};
  // console.log("Day la controller: ",req.user);
  //Mã hóa password về ban đầu
  bcrypt.compare(req.body.password, req.user.password, function (err, results) {
    if (err) {
      return res.status(500).json({
        error: true,
        status: 500,
        message: "Lỗi server"
      });
    } if (results) {//Đăng nhập thành công
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
    } else {
      return res.status(400).json({
        error: false,
        status: 400,
        message: "Sai mật khẩu hoặc password"
      });
    }
  })

}


module.exports = {
  signUpController,
  loginController
}