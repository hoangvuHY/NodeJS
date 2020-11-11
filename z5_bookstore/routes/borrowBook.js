var express = require('express');
var router = express.Router();
var {  createBorrowBookController } = require('../controllers/borrowBookController');
var { checkAuth, checkAdmin } = require('../middleware/index');
router.use(checkAuth);
router.use(checkAdmin);
router.post("/", createBorrowBookController)
module.exports = router;
