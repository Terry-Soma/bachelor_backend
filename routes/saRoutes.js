const router = require("express").Router();
/* 
syntatic sugar const express = require("express");
const router = express.Router();
*/
const s_albaController = require("../controllers/_sa.controller");

router
  .route("/")
  .get(s_albaController.getAll)
  .post(s_albaController.createSAlba);
router
  .route("/:id")
  .get(s_albaController.getSA)
  .patch(s_albaController.updateSA)
  .delete(s_albaController.deleteSA);

module.exports = router;
