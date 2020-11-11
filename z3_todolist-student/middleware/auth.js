const express = require('express');
var userService = require('../services/userServices');
var jwt = require('jsonwebtoken');

var checkUser = async (req, res, next) => {
  var { email } = req.body;
  var user = await userService.checkUser(email);
  console.log(user);
  if (!user) {
    // req.user = user;
    //Nếu tìm thấy
    next();
    // Đi thẳng vào port của register để đăng ký
  } else {
    return res.json({
      error: true,
      status: 400,
      message: 'Tài khoản đã tồn tại. Vui lòng tạo tài khoản khác'
    })
  }
}

async function checkAuth(req, res, next) {
  // Xem tài khoản đã đăng nhập chưa
  var token = req.body.token;
  console.log("day la token", token);
  var data = jwt.verify(token, process.env.JWT_SECRET);
  var user = await userService.checkId(data._id);
  console.log(user);
  if (user) {
    req.user = user;
    //Nếu tìm thấy
    next();
    // Đi thẳng vào port của register để đăng ký
  } else {
    return res.json({
      error: true,
      status: 400,
      message: 'Vui lòng đăng nhập'
    })
  }
}

function checkAdmin(req, res, next) {

  if (req.user.role === 'admin') {
    next();
  } else {
    return res.json({
      error: true,
      status: 400,
      message: 'Bạn không phải admin.Vui lòng đăng nhập'
    })
  }
}

module.exports = {
  checkUser,
  checkAuth,
  checkAdmin
}