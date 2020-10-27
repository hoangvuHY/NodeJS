const express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.json('router1 get')
});
router.post('/', (req, res) => {

    console.log(req.body);
    console.log(req.headers.phu);
    res.json('router1 post' + req.body.username + '---' + req.headers.phu)
});
router.delete('/', (req, res) => {
    res.json('router1 delete')
});
router.put('/', (req, res) => {
    res.json('router1 put')
});


// router.get('/product', (req, res) => {
//     res.json('router1 product')
// });
// router.get('/cart', (req, res) => {
//     res.json('router1 cart')
// });

module.exports = router;