const { Router } = require('express')

const { repoController } = require('../controllers')

const router = Router()

router.get('/list', repoController.listRepositories)
router.post('/new', repoController.createRepository)
router.get('/log:repository', repoController.sendGitLog)

module.exports = router