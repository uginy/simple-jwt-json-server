const Router = require('express')
const router = new Router()
const reportsController = require('../controllers/reportsController')

router.get('/', reportsController.reports)
router.post('/', reportsController.reportsNew)
router.get('/notifications/:date/:person', reportsController.notifications)

module.exports = router