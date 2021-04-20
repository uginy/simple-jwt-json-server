const Router = require('express')
const router = new Router()
const rulesController = require('../controllers/rulesController')

router.get('/rule_types', rulesController.ruleTypes)
router.get('/rule_types/:id', rulesController.algorithmTypes)

module.exports = router