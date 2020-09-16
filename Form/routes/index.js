var express = require('express');
var router = express.Router();
var multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

function fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(png|jpg|gif|jpeg)$/)) {
    cb(new Error('No upload file'))
  } else {
    cb(null, true)
  }
  // You can always pass an error if something goes wrong:

}

var upload = multer({ storage: storage, fileFilter: fileFilter })
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/', upload.single('productImage'), function (req, res, next) {
  var productTitle = req.body.productTitle;

  res.send("Da nhan duoc du lieu: " + productTitle);
});

module.exports = router;
