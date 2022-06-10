const router = require('express').Router();
/* 
syntatic sugar
const router = express.Router();
*/
const authController = require('../controllers/_auth.controller');

router.route('/facebook').post(authController.facebook);
router.route('/google').post(authController.google);
router.route('/google/admin').post(authController.adminGoogle);
router.route('/facebook/admin').post(authController.adminFacebook);

module.exports = router;
