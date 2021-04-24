const Router = require("express");
const router = new Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
module.exports = router;
