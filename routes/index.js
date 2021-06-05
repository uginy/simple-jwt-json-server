const Router = require('express')
const router = new Router()
const mainRouter = require('./mainRouter')
const systemRouter = require('./systemRouter')
const recorderRouter = require('./recorderRouter')
const hotkeysRouter = require('./hotkeysRouter')
const calibrationRouter = require('./calibrationRouter')
const smartShutterRouter = require('./smartShutterRouter')
const v2iRouter = require('./v2iRouter')

router.use('/main', mainRouter)
router.use('/system', systemRouter)
router.use('/record', recorderRouter)
router.use('/preview', hotkeysRouter)
router.use('/geometric_calibration', calibrationRouter)
router.use('/smart_shutter', smartShutterRouter)
router.use('/v2i', v2iRouter)

module.exports = router