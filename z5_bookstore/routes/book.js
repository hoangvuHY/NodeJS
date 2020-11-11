var express = require('express');
var router = express.Router();
let { creatBookController } = require('../controllers/bookController');

/* GET home page. */
router.post('/', creatBookController);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
