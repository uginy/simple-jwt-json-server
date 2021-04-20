const Router = require('express')
const router = new Router()
const countriesController = require('../controllers/countriesController')

router.get('/countries', countriesController.countries)
router.post('/countries', countriesController.cities)

module.exports = router