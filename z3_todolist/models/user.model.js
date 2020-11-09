let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  age: Number
}, {
  collection: 'user',
  timestamps: true
})
module.exports = mongoose.model('user', userSchema);