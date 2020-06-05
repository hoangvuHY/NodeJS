var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/suadaunanh/:sdt', function (req, res, next) {
  res.cookie("dt", req.params.sdt, { maxAge: 9000 });
  res.send("So dien thoai: " + req.params.sdt)
});
/* GET home page. */
router.get('/banhran', function (req, res, next) {

  res.send("So dien thoai: " + req.cookies.dt)
});
/* GET home page. */
router.get('/xoacookie', function (req, res, next) {
  res.clearCookie('dt')
  res.send("Da xoa ")
});
/* GET home page. */
router.get('/taoSession', function (req, res, next) {
  req.session.monan = "Bun dau"
  res.send("Da tao rui ")
});
/* GET home page. */
router.get('/laySession', function (req, res, next) {
  res.send("Da lay rui " + req.session.monan);
});
/* GET home page. */
router.get('/xoaSession', function (req, res, next) {
  req.session.destroy();
  res.send("Da xoa rui ");
});

module.exports = router;
