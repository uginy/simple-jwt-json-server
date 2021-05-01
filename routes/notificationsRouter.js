const Router = require('express')
const router = new Router()
const notificationsController = require('../controllers/notificationsController')

router.get('/', notificationsController.getAll)
router.post('/add', notificationsController.add)
router.get('/:id', notificationsController.getById)
router.patch('/:id', notificationsController.update)
router.delete('/:id', notificationsController.deleteById)

module.exports = router