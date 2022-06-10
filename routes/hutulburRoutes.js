const router = require('express').Router({ mergeParams: true });
/* 
syntatic sugar const express = require("express");
const router = express.Router({mergeParams:true});

*/
const hutulburControll = require('../controllers/_hutulbur.controller');
const mergejilRoutes = require('./mergejilRoutes');
router.use('/:hutulburId/mergejil', mergejilRoutes);

router
  .route('/')
  .get(hutulburControll.getAll)
  .post(hutulburControll.createHutulbur);
router
  .route('/:id')
  .get(hutulburControll.getHutulbur)
  .patch(hutulburControll.updateHutulbur)
  .delete(hutulburControll.deleteHutulbur);

module.exports = router;
