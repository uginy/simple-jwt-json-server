const Router = require("express");
const router = new Router();
const componentsController = require("../controllers/componentsController");

router.get("/components", componentsController.getComponents);
router.get("/about", componentsController.getAbout);

module.exports = router;
