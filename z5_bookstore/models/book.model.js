let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bookSchema = new Schema({
  name: String, 
}, {
  collection: 'book' 
})

var bookModel = mongoose.model('book', bookSchema);
module.exports = bookModel;