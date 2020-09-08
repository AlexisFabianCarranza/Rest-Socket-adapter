const express = require("express");
const router = express.Router();
const chatiggoAdapter = require("../controllers/chatiggoAdapter");

router
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
  .options("*", function (req, res, next) {
    res.end();
  });

router.route("/").post(chatiggoAdapter.sendMessage);

module.exports = router;
