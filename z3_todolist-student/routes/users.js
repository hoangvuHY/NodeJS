var express = require('express');
var router = express.Router();
var { signUpController,
  loginController,
  getAllUserController,
  getDetailUserController,
  deleteUserController,
  updateUserController,
  checkUserControllers

} = require('../controllers/userControllers');

var { checkUser, checkAuth, checkAdmin } = require('../middleware/auth');

/* post users getAllUser listing. */
router.get('/', getAllUserController);
/* get user getDetailUser listing. */
router.get('/:idUser', getDetailUserController);
/* post users login listing. */
router.post('/login', loginController);

/* post users signUp listing . */
//Tất cả những thằng về sau đều có thằng checkUser
router.use(checkUser);
router.post('/', signUpController);

router.use(checkAuth);
router.use(checkAdmin);
/* put user updateUser listing. */
router.put('/:idUser', updateUserController);
/* delete user deleteUser listing. */
router.delete('/:idUser', deleteUserController);
/* get check users listing. */
router.get('/check/check-user', checkUserControllers);

module.exports = router;
