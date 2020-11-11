let { checkEmailService } = require("../services/authServices");
let { getUserByIdService } = require("../services/userService");
var jwt = require('jsonwebtoken');
let isEmailMiddleware = async (req, res, next) => {
  try {
    let user = await checkEmailService(req.body.email)
    if (!user) {
      next();
    } else {
      return res.status(400).json({
        error: true,
        status: 400,
        message: "Tài khoản đã tồn tại"
      })
    }
  } catch (error) {

    return res.status(500).json({
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
      return res.status(400).json({
        error: true,
        status: 400,
        message: "Tài khoản không tồn tại"
      })
    } else {
      req.user = user;
      next();


    }
  } catch (error) {

    return res.status(500).json({
      error: true,
      status: 500,
      message: "Lỗi server"
    })
  }
}

let checkAuth = async (req, res, next) => {
  try {
    //Check xem admin đã đăng nhập chưa
    var token = req.cookies.token || req.body.token;
    // || req.headers.authorization;
    let data = jwt.verify(token, process.env.JWT_SECRET);
    let user = await getUserByIdService(data._id);
    //Cẩn thận thì check xem có tồn tại id không
    // Mặc định là có \
    if (user) {
      req.userLocal = user;
      next();
    } else {
      return res.status(400).json({
        error: true,
        status: 400,
        message: "Tài khoản không tồn tại"
      })
    }

  } catch (error) {
    return res.status(500).json({
      error: true,
      status: 500,
      message: "Bạn cần đăng nhập "
    })
  }
}

let checkAdmin = async (req, res, next) => {
  console.log(req.userLocal.role);
  // check xem có phải admin không
  if (req.userLocal.role == 'admin') {
    next();
  } else {
    return res.status(400).json({
      message: "Bạn không có quyền",
      error: true,
      status: 400
    })
  }
}

module.exports = {
  isEmailMiddleware,
  checkLoginMiddleware,
  checkAdmin,
  checkAuth
}