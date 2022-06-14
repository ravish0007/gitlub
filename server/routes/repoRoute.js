const { Router } = require('express')

const { repoController } = require('../controllers')

const router = Router()

router.get('/list', repoController.listRepositories)
router.post('/new', repoController.createRepository)
router.post('/log', repoController.sendGitLog)
router.get('/branches/:repository', repoController.sendBranches)
router.post('/tree', repoController.serveContent)
router.post('/diff/', repoController.sendDiff)

module.exports = router
