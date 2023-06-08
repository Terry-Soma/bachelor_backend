const router = require('express').Router();

const elsegchController = require('../controllers/_elsegch.controller');
const { protect } = require('../middlewares/_protect');

router
  .route('/')
  .get(elsegchController.getAll)
  .post(elsegchController.createElsegch);

router.route('/withMergejil').get(elsegchController.getAllElsegchWithMergejil);

router.route('/remember-me').post(elsegchController.rememberMe);
router.route('/logout').post(elsegchController.logout);

router
  .route('/:id')
  .get(elsegchController.getElsegch)
  .patch(elsegchController.updateElsegch)
  .put(elsegchController.approveMergejil)
  .delete(elsegchController.deleteElsegch);

router.route('/:id/mergejils/:mergejilId').delete(elsegchController.deleteElsegchMergejil);

router.route('/:id/mergejil').get(elsegchController.getElsegchMergejil);
router.route('/mergejil').post(elsegchController.chooseMergejil);
router.route('/google').post(elsegchController.googleAuth);
module.exports = router;
