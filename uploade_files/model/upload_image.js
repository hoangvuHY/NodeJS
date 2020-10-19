const mongoose = require('mongoose'); 
//Define a schema
var Schema = mongoose.Schema;
var Sanpham = new Schema({
  ten: String,
  gia: Number,
  anh:Array
},{collection:'uploadImage'});
module.exports = mongoose.model('Upload Sanpham', Sanpham );