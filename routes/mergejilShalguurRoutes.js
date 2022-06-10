const router = require('express').Router();
/* 
syntatic sugar const express = require("express");
const router = express.Router();
*/
const mergejilShalguurController = require('../controllers/_mergejilShalguur.controller');

router.route('/').get(mergejilShalguurController.getAll);

module.exports = router;
