const Router = require('express')
const router = new Router()
const countriesRouter = require('./countriesRouter')
const reportsRouter = require('./reportsRouter')
const rulesRouter = require('./rulesRouter')
const authRouter = require('./authRouter')

router.use('/auth', authRouter)
router.use('/geo', countriesRouter)
router.use('/reports', reportsRouter)
router.use('/rules', rulesRouter)

module.exports = router