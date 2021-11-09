const router = require('express').Router()

router.use('/books', require('./book'))
router.use('/collections', require('./collection'))

module.exports = router
