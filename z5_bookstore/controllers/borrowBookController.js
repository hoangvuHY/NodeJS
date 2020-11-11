let { createBorrowBookService } = require('../services/borrowBookService')

let createBorrowBookController = async (req, res) => {
  try {
    let borrowBook = await createBorrowBookService(req.body);
    return res.status(200).json({
      error: false,
      status: 200,
      message: "Mượn sách thành công"
    });
  } catch (error) { 
    return res.status(400).json({
      error: true,
      status: 400,
      message: "Mượn sách không thành công"
    });
  }
}

module.exports = {
  createBorrowBookController
}