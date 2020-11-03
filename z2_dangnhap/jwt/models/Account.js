// Using Node.js `require()`
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/log_in', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: String,
    password: String,
    role: String
}, { collection: 'account' });
const AccountModel = mongoose.model('user', AccountSchema);

module.exports = AccountModel;