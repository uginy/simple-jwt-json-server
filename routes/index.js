const Router = require('express')
const router = new Router()
const authRouter = require('./authRouter')
const mainRouter = require('./mainRouter')
const systemRouter = require('./systemRouter')
const recorderRouter = require('./recorderRouter')
const hotkeysRouter = require('./hotkeysRouter')

router.use('/auth', authRouter)
router.use('/main', mainRouter)
router.use('/system', systemRouter)
router.use('/record', recorderRouter)
router.use('/preview', hotkeysRouter)

module.exports = router