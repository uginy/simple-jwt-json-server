const Router = require('express')
const router = new Router()
const rulesController = require('../controllers/rulesController')

router.get('/rule_types', rulesController.ruleTypes)
router.get('/rule_types/:id', rulesController.algorithmTypes)
router.get('/', rulesController.getAll)
router.post('/add', rulesController.add)
router.get('/:id', rulesController.getById)
router.patch('/:id', rulesController.update)
router.delete('/:id', rulesController.deleteById)

module.exports = router
module.exports = router