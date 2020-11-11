let BookModel = require('../models/book.model');
let UserModel = require('../models/user.model');
let BorrowBookModel = require('../models/borrowBook.model');
function createBorrowBookService(infoBorrowBook) {
  return BorrowBookModel.create(infoBorrowBook);
}

module.exports = { createBorrowBookService }