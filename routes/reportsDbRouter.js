const Router = require('express')
const router = new Router()
const reportsDbController = require('../controllers/reportsDbController')

router.post('/', reportsDbController.getAll)
router.post('/add', reportsDbController.add)
router.post('/:id', reportsDbController.getById)

module.exports = router