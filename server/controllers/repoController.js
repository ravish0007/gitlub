
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const gitExec = (user) => `ssh ${user}@${process.env.GITSERVER}`

async function createRepository (req, res) {
  if (!req.body.repository) {
    return res.send(400).json({ message: 'repository not found' })
  }

  const username = res.locals.user.name

  try {
    const { stdout, stderr } = await exec(`${gitExec(username)} newrepo ${req.body.repository}`)

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
    const username = res.locals.user.name
    const { stdout, stderr } = await exec(`${gitExec(username)} listrepos`)

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
    const username = res.locals.user.name
    const { stdout, stderr } = await exec(`${gitExec(username)} logrepo ${req.params.repository || ''}`)

    return res.status(200).send({ log: stdout })
  } catch (err) {
    console.log(err)
    if (err.stderr) {
      return res.status(200).send({ log: 'No commits yet' })
    }
    return res.status(500).send({ message: `${err}` })
  }
}

async function serveContent (req, res) {
  if (!req.params.tree) {
    return res.send(400).json({ message: 'tree not found' })
  }

  try {
    const { stdout, stderr } = await exec(`${gitExec(username)} fetchcontent ${req.params.tree}`)
    return res.status(200).send({ log: stdout })
  } catch (err) {
    console.log(err)
    if (err.stderr) {
      return res.status(404).send({ message: 'no content' })
    }
    return res.status(500).send({ message: `${err}` })
  }
}

module.exports = {
  createRepository,
  listRepositories,
  sendGitLog,
  serveContent

}
