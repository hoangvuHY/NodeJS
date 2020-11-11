let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  age: Number,
  role: String,

  /* idJob: [{
    type: String,
    ref: "job"
  }] */
}, {
  collection: 'user',
  timestamps: true
})
module.exports = mongoose.model('user', userSchema);