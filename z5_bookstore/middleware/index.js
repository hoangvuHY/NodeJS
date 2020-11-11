let { checkEmailService } = require("../services/authServices");

let isEmailMiddleware = async (req, res, next) => {
  try {
    let user = await checkEmailService(req.body.email)
    if (!user) {
      next();
    } else {
      res.status(400).json({
        error: true,
        status: 400,
        message: "Tài khoản đã tồn tại"
      })
    }
  } catch (error) {

    res.status(500).json({
      error: true,
      status: 500,
      message: "Lỗi server"
    })
  }
}
let checkLoginMiddleware = async (req, res, next) => {
  try {
    let user = await checkEmailService(req.body.email)
    if (!user) {
      //neu email khong ton tai
      res.status(400).json({
        error: true,
        status: 400,
        message: "Tài khoản không tồn tại"
      })
    } else {
      req.user = user;
      next();


    }
  } catch (error) {

    res.status(500).json({
      error: true,
      status: 500,
      message: "Lỗi server"
    })
  }
}

module.exports = {
  isEmailMiddleware,
  checkLoginMiddleware
}