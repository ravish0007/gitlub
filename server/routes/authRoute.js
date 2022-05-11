const { Router } = require('express')

const { authController } = require('../controllers')

const router = Router()

router.get('/new', authController.createUser)

module.exports = router
