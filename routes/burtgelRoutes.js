const router = require('express').Router();

const burtgelController = require('../controllers/_burtgel.controller');
router.route('/').get(burtgelController.getAll);
router.route('/get-count').get(burtgelController.getCount);
router.route('/paid').get();
module.exports = router;
