let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
  name: String,
  birthday: Date,
  phone: Number,
  address: String,
  identification: Number,
  username: String,
  email: String,
  password: String,
  role: { type: String, default: 'user' },
}, {
  collection: 'users',
  timestamps: true,
})
var userModel = mongoose.model('users', userSchema);
module.exports = userModel;