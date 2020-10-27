const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/log_in', {
    useNewUrlParser: true,
    useUnifiedTopology: true
        /* ,
            useFindAndModify: false,
            useCreateIndex: true
             */
});
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const AccountSchema = new Schema({
    username: String,
    password: String
}, { collection: 'account' });
const AccountModels = mongoose.model('account', AccountSchema);
module.exports = AccountModels;