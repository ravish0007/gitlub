const { Router } = require('express')

const { authController } = require('../controllers')

const router = Router()

router.post('/new', authController.createUser)

module.exports = router
