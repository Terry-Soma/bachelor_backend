const router = require('express').Router();
/* 
syntatic sugar const express = require("express");
const router = express.Router();
*/
const schoolControll = require('../controllers/_school.controller');
const hutulburRoutes = require('./hutulburRoutes');
// school/:schoolId/hutulbur
router.use('/:schoolId/hutulbur', hutulburRoutes);

router.route('/').get(schoolControll.getAll).post(schoolControll.createSchool);
router
  .route('/:id')
  .get(schoolControll.getSchool)
  .patch(schoolControll.updateSchool)
  .delete(schoolControll.deleteSchool);
router.route('/:id/photo').put(schoolControll.uploadSchoolPhoto);
module.exports = router;
