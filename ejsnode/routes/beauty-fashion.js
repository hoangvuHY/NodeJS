var express = require('express');
var router = express.Router();


router.get('/skincare.chn', function (req, res, next) {
    res.send('Đây là trang   beauty-fashion/skincare.chn');
});

router.get('/makeup-hair.chn', function (req, res, next) {
    res.send('Đây là trang   beauty-fashion/makeup-hair.chn');
});

router.get('/review-by-kenh14.chn', function (req, res, next) {
    res.send('Đây là trang   beauty-fashion/review-by-kenh14.chn');
});

router.get('/fashion.chn', function (req, res, next) {
    res.send('Đây là trang   beauty-fashion/fashion.chn');
});



module.exports = router;
