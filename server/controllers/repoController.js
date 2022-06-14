const util = require('util')
const exec = util.promisify(require('child_process').exec)

const diff2html = require('diff2html')

const gitExec = (user) => `ssh ${user}@${process.env.GITSERVER}`

async function createRepository (req, res) {
  if (!req.body.repository) {
    return res.send(400).json({ message: 'repository not found' })
  }

  const username = res.locals.user.name

  try {
    const { stdout, stderr } = await exec(
      `${gitExec(username)} newrepo ${req.body.repository}`
    )

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
  const { repository, branch } = req.body

  if (!repository || !branch) {
    return res.status(400).send({ message: 'repository/branch not found' })
  }

  try {
    const username = res.locals.user.name
    const { stdout, stderr } = await exec(
      `${gitExec(username)} fetchcommits ${repository} ${branch}`
    )

    return res.status(200).send({ log: stdout })
  } catch (err) {
    console.log(err)
    if (err.stderr) {
      return res.status(200).send({ log: 'No commits yet' })
    }
    return res.status(500).send({ message: `${err}` })
  }
}

async function sendBranches (req, res) {
  const { repository } = req.params

  if (!repository) {
    return res.status(400).json({ message: 'repository not found' })
  }

  try {
    const username = res.locals.user.name
    const { stdout, stderr } = await exec(`${gitExec(username)} listbranches ${repository}`)
    return res.status(200).send({ branches: stdout.trim().split('\n') })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: `${err}` })
  }
}

async function sendDiff (req, res) {
  const { repository, commit } = req.body

  if (!repository || !commit) {
    return res.send(400).json({ message: 'repository/commit not found' })
  }

  try {
    const username = res.locals.user.name
    const { stdout, stderr } = await exec(`${gitExec(username)} gitdiff ${repository} ${commit}`)

    return res.status(200).send({ diff: diff2html.parse(stdout) })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: `${err}` })
  }
}

async function serveContent (req, res) {
  const { repository, branch, path } = req.body

  if (!repository || !branch || !path) {
    return res.status(400).send({ message: 'repository/branch/path not found' })
  }

  try {
    const username = res.locals.user.name
    const { stdout, stderr } = await exec(
      `${gitExec(username)} fetchcontent ${req.params.repository} ${
        req.params[0] || ''
      }`
    )

    let treeOutput = stdout.split('\n')
    if (stdout.startsWith('tree')) {
      treeOutput.splice(0, 2)
      treeOutput = treeOutput.filter(x => x != '')
    } else {
      treeOutput = stdout
    }

    return res.status(200).send({ output: treeOutput })
  } catch (err) {
    console.log(err)
    if (err.stderr) {
      return res.status(200).send({ output: [] })
    }
    return res.status(500).send({ message: `${err}` })
  }
}

module.exports = {
  createRepository,
  listRepositories,
  sendGitLog,
  serveContent,
  serveContent,
  sendBranches,
  sendDiff
}
