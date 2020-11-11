let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: 'student' },
  
}, {
  collection: 'users' 
})

var userModel = mongoose.model('users', userSchema);
module.exports = userModel;