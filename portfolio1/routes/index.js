var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/portfolio-detail/*-:productID', function (req, res, next) {
  var id = req.params.productID;
  if (!req.session.productList) {
    req.session.productList = [];
  }
  if (req.session.productList.indexOf(id) == -1) {
    req.session.productList.push(id);
  }
  res.render('portfolio', { productID: id, list: req.session.productList });

});

router.get('/list', function (req, res, next) {

  res.render('list', { list: req.session.productList });

});

module.exports = router;
