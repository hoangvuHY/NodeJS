let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let tokenSchema = new Schema({
  idUser: String,
  value: String
}, {
  collection: 'token',
  timestamps: true
})
module.exports = mongoose.model('token', tokenSchema);