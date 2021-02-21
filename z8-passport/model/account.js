const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/local', { useNewUrlParser: true, useUnifiedTopology: true });


var accountSchema = new mongoose.Schema({
  email: String,
  password: String
}, {
  collection: 'users'
});

const AccountModel = mongoose.model('users', accountSchema);
module.exports = AccountModel;