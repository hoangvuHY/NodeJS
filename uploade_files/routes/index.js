var express = require('express');
var router = express.Router();
var multer = require('multer');
const mongoose = require('mongoose');
const uploadModel = require('../model/upload_image');
mongoose.connect('mongodb://localhost:27017/upload_image', { useNewUrlParser: true, useUnifiedTopology: true });



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

var upload = multer({ storage: storage,fileFilter:fileFilter });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

var images = [];
/* POST home page. Gửi trực tiếp vào file*/
router.post('/uploadfile', upload.any(), function (req, res, next) {

  images.push(req.files[0].path);

  console.log(images);
  res.status(200).send(req.files);

  // res.render('index', { title: 'Express' });
});

/* GET uploadImage */
router.post('/uploadImage', function (req, res, next) {

  var object = {
    ten: req.body.tensp,
    gia: req.body.giasp,
    anh: images
  };
  var data = new uploadModel(object);
  data.save();
  res.render('imageUpload', { title: 'Express' });
});
/* GET xem */
router.get('/xem', function (req, res, next) {

  uploadModel.find({}, (err, dulieu) => {
    console.log(dulieu);
    res.render('xem', { title: 'Express', data: dulieu }); 
  })

});
module.exports = router;
