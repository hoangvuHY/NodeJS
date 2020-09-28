var express = require('express');
var router = express.Router();
var contactModel = require('../model/contact');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET xem */
router.get('/xem', function (req, res, next) {
  contactModel.find({}, function (err, dulieu) {
    if (err) {
      console.log(err);
    };
    // console.log(dulieu);
    res.render('xem', { title: 'Xem dữ liệu', data: dulieu });
  });
});
/* GET delete */
router.get('/xoa/:idcanxoa', function (req, res, next) {
  var idcanxoa = req.params.idcanxoa;
  contactModel
    .findByIdAndRemove(idcanxoa)
    .exec()
    .then(function (doc) {
      return doc;
    }).catch(function (error) {
      throw error;
    });
  res.redirect('/xem')
});
/* GET sua: lay du lieu ve form sua. */
router.get('/sua/:idcansua', function (req, res, next) {
  var idcansua = req.params.idcansua;
  contactModel.find({ _id: idcansua }, function (err, dulieu) {
    if (err) {
      console.log(err);
    };
    // console.log(dulieu);
    res.render('sua', { title: 'Sửa dữ liệu', data: dulieu });
  });
});
/* POST sua: Truyền dữ liệu lên mongodb. */
router.post('/sua/:idcansua', function (req, res, next) {
  var idcansua = req.params.idcansua;
  contactModel.findById(idcansua, function (err, doc) {
    if (err) return err;
    doc.ten = req.body.ten;
    doc.tuoi = req.body.tuoi;
    doc.save();
  });
  res.redirect('/xem')
});
/* GET Thêm. */
router.get('/them', function (req, res, next) {

  res.render('them', { title: 'Express' });
});

/* Post Thêm. */
router.post('/them', function (req, res, next) {

  var dataInsert = {
    ten: req.body.ten,
    tuoi: req.body.tuoi
  };

  var data = new contactModel(dataInsert);
  data.save();
  res.redirect('/xem')
});
module.exports = router;
