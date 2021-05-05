const Router = require("express");
const router = new Router();
const componentsController = require("../controllers/componentsController");

router.get("/components", componentsController.getComponents);

module.exports = router;
