const express = require("express");
const routes = express.Router();
const verify = require("../middleware/verifyToken");
const auth = require("../middleware/verifyAdmin");

routes.get("/user", verify, (req, res) => {
  res.send("Hello World!");
});

routes.get("/admin", verify, auth, (req, res) => {
  res.send("Hello World!");
});

module.exports = routes;
