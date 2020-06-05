var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index.html', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET sanpham page. */
router.get('/sanpham/:chisosanpham-:gia', function (req, res, next) {
  res.send("Mã sản phẩm là: " + req.params.chisosanpham + " Giá sản phẩm là: " + req.params.gia);
});
/* GET tintuc page. */
router.get('/tintuc', function (req, res, next) {
  res.render('tin', { title: 'Tin tuc', noidung: "Day là nội dung của tin tức" });
});
/* GET tintuc page. */
router.get('/vuoppa', function (req, res, next) {
  var dulieu = {
    danhsachsv: ['nam', 'phuong', 'bao', 'toan', 'lam']
  }
  res.render('vuoppa', { danhsach: dulieu });
});

/* GET about page. */
router.get('/about.html', function (req, res, next) {
  res.render('about', { title: 'Trang About' });
});
/* GET post page. */
router.get('/post.html', function (req, res, next) {
  res.render('post', { title: 'Trang post' });
});
/* GET contact page. */
router.get('/contact.html', function (req, res, next) {
  res.render('contact', { title: 'Trang contact' });
});


module.exports = router;
