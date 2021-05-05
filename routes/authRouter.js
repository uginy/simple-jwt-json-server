const Router = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { check } = require("express-validator");

router.post("/login", authController.login);
router.post(
  "/register",
  [
    check("username", "Username can not be empty").trim().notEmpty(),
    check("password", "Password must be more that 4 and less than 10 characters").trim().isLength({ min: 4, max: 10 }),
  ],
  authController.registration
);
router.get("/users", authMiddleware.roleCheck(['admin']), authController.getUsers);
router.get("/uiControls", authMiddleware.roleCheck(['admin']), authController.getUiControls);

module.exports = router;
