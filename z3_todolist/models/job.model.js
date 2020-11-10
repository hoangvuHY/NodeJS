let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let jobSchema = new Schema({
  tabName: String,
  level: String
}, {
  collection: 'job',
  timestamps: true
})
module.exports = mongoose.model('job', userSchema);