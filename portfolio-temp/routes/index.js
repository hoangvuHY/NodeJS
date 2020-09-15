var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/portfolio-detail/*-:idProduct', function (req, res, next) {
  res.render('portfolio', { idProduct: req.params.idProduct });
});

module.exports = router;
