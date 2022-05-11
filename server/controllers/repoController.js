
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const GIT_EXEC = `sshpass -p ${process.env.gitpass} ssh git@${process.env.gitserver}`

async function createRepository (req, res) {
  if (!req.body.repository) {
    return res.send(400).json({ message: 'repository not found' })
  }

  try {
    const { stdout, stderr } = await exec(`${GIT_EXEC} newrepo ${req.body.repository}`)

    if (stderr) {
      return res.send(449).json({ message: `${stderr}` })
    }
    return res.status(201).send({ message: `${stdout}` })
  } catch (err) {
    console.log(err)
    return res.send(500).json({ message: `${err}` })
  }
}

async function listRepositories (req, res) {
  try {
    const { stdout, stderr } = await exec(`${GIT_EXEC} listrepos`)

    if (stderr) {
      return res.send(449).json({ message: `${stderr}` })
    }
    return res.status(201).send({ repositories: stdout.trim().split('\n') })
  } catch (err) {
    console.log(err)
    return res.send(500).json({ message: `${err}` })
  }
}

async function sendGitLog (req, res) {
  if (!req.params.repository) {
    return res.send(400).json({ message: 'repository not found' })
  }

  try {
    const { stdout, stderr } = await exec(`${GIT_EXEC} logrepo ${req.params.repository}`)

    return res.status(200).send({ log: stdout })
  } catch (err) {
    console.log(err)
    if (err.stderr) {
      return res.status(200).send({ log: 'No commits yet' })
    }
    return res.status(500).send({ message: `${err}` })
  }
}

module.exports = { createRepository, listRepositories, sendGitLog }
