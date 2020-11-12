var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
let { getUserByIdService } = require("../services/userService");
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login');
});
/* GET home page. */
router.get('/home', async (req, res, next) => {
  //Check auth middleware
  try {
    //Check xem admin đã đăng nhập chưa
    var token = req.cookies.token || req.body.token;
    // || req.headers.authorization;
    let data = jwt.verify(token, process.env.JWT_SECRET); 
    let user = await getUserByIdService(data._id);
    console.log('dfsdf user ', user);
    if (user && user.role === "admin") {
      return res.render("homeAdmin");
    }
    if (user && user.role === "student") {
      return res.render("homeUser");
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      status: 500,
      message: "Bạn cần đăng nhập "
    })
  }
})
module.exports = router;
