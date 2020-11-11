var { creatBookService } = require('../services/bookService');
// let router = require('express').Router();

let creatBookController = async (req, res) => {
  try {
    let book = await creatBookService(req.body.name);
    return res.status(200).json({
      error: false,
      status: 200,
      message: "Tạo sách thành công"
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      status: 500,
      message: "Tạo sách không thành công"
    });
  }
}

module.exports = {
  creatBookController
}


