let mongoose = require('../config/dbConnect');
let Schema = mongoose.Schema;
let userSchema = new Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: "user"
  }
}, {
  collection: 'users',
  timestamps: true
})

var userModel = mongoose.model('users', userSchema);
module.exports = userModel;