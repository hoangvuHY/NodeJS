let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let borrowBookSchema = new Schema({
  idUser: { type: String, ref: "users" },
  idBook: [{
    type: String,
    ref: "book"
  }
  ]
}, {
  collection: 'borrowBook', timestamps: true,
})

var borrowBookModel = mongoose.model('borrowBook', borrowBookSchema);
module.exports = borrowBookModel;