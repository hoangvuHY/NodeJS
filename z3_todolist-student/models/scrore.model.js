let mongoose = require('../config/dbConnect');
let UserModel = require('./user.model');
let ClassModel = require('./class.model');
let Schema = mongoose.Schema;
let scoreSchema = new Schema({
  idUser: {
    type: String,
    ref: 'users'
  },
  idClass: {
    type: String,
    ref: "class"
  },
  //Điểm danh
  attend: [
    {
      type: String,
      default: null
    }
  ],
  //Điểm 
  number: [
    {
      type: String,
      default: null
    }
  ],
}, {
  collection: 'score',
  timestamps: true
})
let scoreModel = mongoose.model('score', scoreSchema);

/* scoreModel.create({
  idClass: "5fab488b5a959c1ee0868c91",
  idUser: "5fab45b22e7bcd14ecf4bb86"
}).then((result) => {
  console.log(result);
}).catch((error) => {

}) */
scoreModel.find({
  idUser: "5fab45b22e7bcd14ecf4bb86"
}).populate("idClass")
  .populate("idUser")
  .then((result) => {
    console.log(result);

  }).catch((error) => {

  })