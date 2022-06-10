const router = require('express').Router();
/* 
syntatic sugar const express = require("express");
const router = express.Router();
*/
const shalguurController = require('../controllers/_shalguur.controller');

router
  .route('/')
  .get(shalguurController.getAll)
  .post(shalguurController.createShalguur);

router
  .route('/:id')
  .get(shalguurController.getShalguur)
  .patch(shalguurController.updateShalguur)
  .delete(shalguurController.deleteShalguur);

module.exports = router;
