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


/* post users signUp listing . */
router.post('/', signUpController);
/* post users login listing. */
router.post('/login', loginController);
/* post users getAllUser listing. */
router.get('/', getAllUserController);
/* get user getDetailUser listing. */
router.get('/:idUser', getDetailUserController);
/* put user updateUser listing. */
router.put('/:idUser', updateUserController);
/* delete user deleteUser listing. */
router.delete('/:idUser', deleteUserController);
/* get check users listing. */
router.get('/check/check-user', checkUserControllers);
module.exports = router;
