const { Router } = require('express')

const { authController } = require('../controllers')

const router = Router()

router.post('/signup', authController.createUser)
router.post('/signin', authController.verifyUser)

module.exports = router
