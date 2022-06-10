const router = require('express').Router({ mergeParams: true });
/* 
syntatic sugar const express = require("express");
const router = express.Router();
*/
const mergejilController = require('../controllers/_mergejil.controller');
router
  .route('/')
  .get(mergejilController.getAll)
  .post(mergejilController.createMergejil);

router
  .route('/:id')
  .get(mergejilController.getMergejil)
  .patch(mergejilController.updateMergejil)
  .delete(mergejilController.deleteMergejil);

router.route('/:id/more').get(mergejilController.getMergejilWithMoreInfo);
module.exports = router;
