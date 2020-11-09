let userService = require('../services/userServices');
function signUpController(req, res) {
  let { email, username, password } = req.body;
  userService.signUp(email, username, password)
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
}
function loginController(req, res) {
  let { email, password } = req.body;
  userService.login(email, password)
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
    });
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
  updateUserController
}