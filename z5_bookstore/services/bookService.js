let BookModel = require('../models/book.model');

function creatBookService(name) {
  BookModel.create({ name });
}
function getBookIdService(id) {
  BookModel.findOne({ _id: id })
}
module.exports = {
  creatBookService,
  getBookIdService
}