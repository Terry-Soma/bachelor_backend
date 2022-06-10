const router = require('express').Router();
/* 
syntatic sugar
const router = express.Router();
*/
const userController = require('../controllers/_user.controller');

// users/
router.route('/').get(userController.getAll).post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
