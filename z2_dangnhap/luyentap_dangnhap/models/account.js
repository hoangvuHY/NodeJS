const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/practice_login', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: String,
    password: String
}, { collection: "account" });
const AccountModels = mongoose.model('account', AccountSchema);
module.exports = AccountModels;