var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/portfolio-detail/*-:productID', function (req, res, next) {
  if (!req.session.productsList) {
    req.session.productsList = [];
  }
  if (req.session.productsList.indexOf(req.params.productID) === -1) {
    req.session.productsList.push(req.params.productID);
  }

  res.render('portfolio', { productID: req.params.productID, productList: req.session.productsList });
});

/* GET home page. */
router.get('/list', function (req, res, next) {
  res.render('list', { productList: req.session.productsList });
});
module.exports = router;
