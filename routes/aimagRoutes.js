const router = require('express').Router();

/* 
syntatic sugar const express = require("express");
const router = express.Router();
*/
const aimagController = require('../controllers/_aimag.controller');

router.route('/').get(aimagController.getAll).post(aimagController.createAimag);
router
  .route('/:id')
  .get(aimagController.getAimag)
  .patch(aimagController.updateAimag)
  .delete(aimagController.deleteAimag);

module.exports = router;
