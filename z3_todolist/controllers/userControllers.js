let userService = require('../services/userServices');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
let TokenModel = require('../models/token');


function signUpController(req, res) {
  let { email, username, password } = req.body;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB. 
      userService.signUp(email, username, hash)
        .then(() => {
          return res.json({
            error: false,
            status: 200,
            message: 'Tạo tài khoản thành công!'
          })
        }).catch((err) => {
          return res.json({
            error: true,
            status: 500,
            message: 'Tạo tài khoản không thành công!'
          })
        });
    });
  });

}
function loginController(req, res) {
  let { email, password } = req.body;
  //checkEmail
  userService.checkEmail(email)
    .then((user) => {
      if (!user) {
        return res.json({
          error: true,
          status: 400,
          message: 'Đăng nhập tài khoản không thành công!'
        })
      }
      // Load hash from your password DB.
      bcrypt.compare(password, user.password, function (err, result) {
        // result == true
        if (!result) {
          return res.json({
            error: true,
            status: 400,
            message: 'Tài khoản hoặc mật khẩu không chính xác!'
          })
        } else {
          var accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { algorithm: "HS512", expiresIn: "1d" });
          var refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { algorithm: "HS512", expiresIn: "3650d" });
          TokenModel.findOne({ idUser: user._id })
            .then((checkToken) => {
              if (!checkToken) {
                //Người dùng đăng nhập lần đầu
                TokenModel.create({ idUser: user._id, value: refreshToken })
                  .then(() => {
                    return res.json({
                      error: false,
                      status: 200,
                      message: 'Đăng nhập tài khoản thành công!',
                      accessToken, refreshToken
                    })
                  })
              } else {
                TokenModel.updateOne({ idUser: user._id }, { value: refreshToken })
                  .then(() => {
                    //Người dùng đăng nhập cac lan khac

                    return res.json({
                      error: false,
                      status: 200,
                      message: 'Đăng nhập tài khoản thành công!',
                      accessToken, refreshToken
                    })
                  })
              }
            })
          //Lưu trực tiếp trên server , expires: 60 * 60 * 1000 * 24 * 1 
          // res.cookie("token", token, { maxAge: 60 * 60 * 1000 * 24 * 1 })
          /* return res.json({
            error: false,
            status: 200,
            message: 'Đăng nhập tài khoản thành công!',
            token: accessToken
          }) */
        }
      });
    })
    .catch((err) => {
      return res.json({
        error: true,
        status: 500,
        message: 'Đăng nhập tài khoản không thành công!'
      })
    });


  /*  userService.login(email, password)
     .then((data) => {
       // null neu pass or email k dung
       // {} neu hop le
       if (!data) {
         return res.json({
           error: true,
           status: 400,
           message: 'Tài khoản hoặc mật khẩu không chính xác!'
         })
       } else {
         return res.json({
           error: false,
           status: 200,
           message: 'Đăng nhập tài khoản thành công!'
         })
       }
     }).catch((err) => {
       return res.json({
         error: true,
         status: 500,
         message: 'Đăng nhập tài khoản không thành công!'
       })
     }); */
}

function checkUserControllers(req, res) {
  var data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
  res.json(data);
}
function getAllUserController(req, res) {
  userService.getAllUserService()
    .then((data) => {
      return res.json({
        error: false,
        status: 200,
        data: data,
        message: 'Hiển thị all users thành công!'
      })
    }).catch((err) => {
      return res.json({
        error: true,
        status: 500,
        message: 'Hiển thị all users không thành công!'
      })
    });
}

function getDetailUserController(req, res) {
  var { idUser } = req.params;
  userService.getDetailUserService(idUser)
    .then((data) => {
      //null Nếu id k tồn tại
      //{}  Nếu id tồn tại
      if (!data) {

        return res.json({
          error: true,
          status: 400,
          message: 'Người dùng không tồn tại'
        })

      } else {

        return res.json({
          error: false,
          status: 200,
          data: data,
          message: 'Hiển thị người dùng thành công'
        })

      }

    }).catch((err) => {
      return res.json({
        error: true,
        status: 500,
        message: 'Hiển thị user không thành công!'
      })
    });
}

function deleteUserController(req, res) {
  var { idUser } = req.params;
  userService.deleteUserService(idUser)
    .then((data) => {
      //xóa thì nên kiểm tra 
      // console.log(data);
      if (data.ok > 0) {

        return res.json({
          error: false,
          status: 200,
          message: 'xóa người dùng thành công'
        })

      } else {

        return res.json({
          error: true,
          status: 400,
          message: 'Người dùng không tồn tại và xóa không thành công'
        })

      }
    }).catch((err) => {
      return res.json({
        error: true,
        status: 500,
        message: 'Xóa user không thành công!'
      })
    });
}

function updateUserController(req, res) {
  var { idUser } = req.params;
  var { username, email, password, age } = req.body;
  userService.updateUserService(idUser, email, username, password, age)
    .then((data) => {
      console.log(data);
      if (data.nModified > 0) {

        return res.json({
          error: false,
          status: 200,
          message: 'Cập nhật người dùng thành công'
        })

      } else {

        return res.json({
          error: true,
          status: 400,
          message: 'Người dùng không tồn tại và xóa không thành công'
        })

      }
    }).catch((err) => {
      return res.json({
        error: true,
        status: 500,
        message: 'Xóa user không thành công!'
      })
    });
}



module.exports = {
  signUpController,
  loginController,
  getAllUserController,
  getDetailUserController,
  deleteUserController,
  updateUserController,
  checkUserControllers
}