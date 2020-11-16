let { getUserByIdService, checkEmailService } = require("../services/userService");
var jwt = require('jsonwebtoken');
let isEmailMiddleware = async (req, res, next) => {
  //Check Email có tồn tại không.
  try {
    let email = await checkEmailService(req.body.email);
    console.log(email);
    if (!email) {
      //Nếu email không tồn tại
      next();
    } else {
      //Nếu email tồn tại
      return res.json({
        error: true,
        status: 400,
        message: "Tài khoản đã tồn tại"
      })
    }
  } catch (error) {
    return res.json({
      error: true,
      status: 500,
      message: "Lỗi server isEmail Middleware"
    })
  }
}
let checkLoginMiddleware = async (req, res, next) => { 
  try {
    let user = await checkEmailService(req.body.email); 
    if (!user) {
      //Nếu không tìm thấy email
      return res.json({
        error: true,
        status: 400,
        message: "Tài khoản không tồn tại "
      })
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      status: 500,
      message: "Lỗi server checkLogin Middleware"
    })
  }
}

//Check xem da dang nhap chua
let checkAuth = async (req, res, next) => {
  try {
    var token = req.cookies.token || req.body.token;
    // || req.headers.authorization;
    let data = jwt.verify(token, process.env.JWT_SECRET);
    let user = await getUserByIdService(data._id);
    if (user) {
      req.userLocal = user;
      next();
    } else {
      return res.json({
        error: true,
        status: 400,
        message: "Tài khoản không tồn tại"
      })
    }
  } catch (error) {
    return res.json({
      error: true,
      status: 500,
      message: "Bạn cần đăng nhập "
    })
  }
}

let checkAdmin = async (req, res, next) => {
  if (req.userLocal.role == 'admin') {
    next();
  } else {
    return res.json({
      message: "Bạn không có quyền",
      error: true,
      status: 400
    })
  }
}

let checkOwner = async (req, res, next) => {
  if (req.userLocal.role == 'owner') {
    next();
  } else {
    return res.json({
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
  checkAuth,
  checkOwner
}