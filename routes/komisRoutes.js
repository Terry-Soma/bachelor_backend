const router = require('express').Router({ mergeParams: true });

const komisController = require('../controllers/_komis.controller');

router.route('/').get(komisController.getAll).post(komisController.createKomis);
router
  .route('/:id')
  .get(komisController.getKomis)
  .patch(komisController.updateKomis)
  .delete(komisController.deleteKomis);

module.exports = router;
