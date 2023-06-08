const router = require('express').Router();

const burtgelController = require('../controllers/_burtgel.controller');
router.route('/').get(burtgelController.getAll);
router.route('/get-count').get(burtgelController.getCount);
router.route('/schoolAndCount').get(burtgelController.getSchoolAndCount);
router.route('/mergejilAndCount').get(burtgelController.getMergejilAndCount);
router.route('/aimagAndCount').get(burtgelController.getAllaimagAndCount);
router.route('/hutulburAndCount').get(burtgelController.getAllhutulbur);

router.route('/paid').get();
module.exports = router;
