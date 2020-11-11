let mongoose = require('../config/dbConnect');
let UserModel = require('./user.model')
let Schema = mongoose.Schema;
let classSchema = new Schema({
  name: String,
  idTeacher: {
    type: String,
    ref: 'users'
  }
}, {
  collection: 'class',
  timestamps: true
})
var classModel = mongoose.model('class', classSchema);
module.exports = classModel;

// console.log('hehehhe');
/* classModel.create({
  name: 'lop offline',
  idTeacher: "5fab45c410e4fb2790d82c98"
}).then((result) => {
  console.log(result);
}).catch((error) => {

}) */
/* classModel.findOne({
  _id:'5fab488b5a959c1ee0868c91'
})
  .populate("idTeacher")
  .then((result) => {
    console.log(result);
    console.log('Thanh cong');
  }).catch((error) => {

  })
 */