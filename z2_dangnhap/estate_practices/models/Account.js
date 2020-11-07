const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/estate', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  fullName: String,
  identification: Number,
  address: String,
  phone: Number,
  email: String,
  password: String,
  role: Number
}, { collection: 'accounts' });
const AccountModels = mongoose.model('accounts', AccountSchema);
module.exports = AccountModels;