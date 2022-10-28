const express = require("express");
const routes = express.Router();
const controller = require("../controller/loginController");

routes.get("/login", controller.getUser);

routes.post("/register", controller.postUser);

module.exports = routes;
