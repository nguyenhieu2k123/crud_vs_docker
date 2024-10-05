import express from 'express'
const router = express.Router();


router.use('/api', require('../routers/order'))
router.use('/api', require('../routers/product'))
router.use('/api', require('../routers/auth'))

module.exports = router;