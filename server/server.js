const express = require('express')
const bodyParser = require('body-parser')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

require('dotenv').config()

const app = express()

app.use(bodyParser.json())

app.post('/new', async (req, res) => {
  if (!req.body.repository) {
    return res.send(400).json({ message: 'repository not found' })
  }

  try {
    const { stdout, stderr } = await exec(`sshpass -p ${process.env.gitpass} ssh git@${process.env.gitserver} newrepo ${req.body.repository}`)

    if (stderr) {
      return res.send(449).json({ message: `${stderr}` })
    }
    return res.status(201).send({ message: `${stdout}` })
  } catch (err) {
    console.log(err)
    return res.send(500).json({ message: `${err}` })
  }
})

app.get('/repos', async (req, res) => {
  try {
    const { stdout, stderr } = await exec(`sshpass -p ${process.env.gitpass} ssh git@${process.env.gitserver} listrepos`)

    if (stderr) {
      return res.send(449).json({ message: `${stderr}` })
    }
    return res.status(201).send({ repositories: stdout.trim().split('\n') })
  } catch (err) {
    console.log(err)
    return res.send(500).json({ message: `${err}` })
  }
})

app.get('/log/:repository', async (req, res) => {
  if (!req.params.repository) {
    return res.send(400).json({ message: 'repository not found' })
  }

  try {
    const { stdout, stderr } = await exec(`sshpass -p ${process.env.gitpass} ssh git@${process.env.gitserver} logrepo ${req.params.repository}`)

    return res.status(200).send({ log: stdout })
  } catch (err) {
    console.log(err)
    if (err.stderr) {
      return res.status(200).send({ log: 'No commits yet' })
    }
    return res.status(500).send({ message: `${err}` })
  }
})

app.listen(5000, () => console.log('listening on 5000'))
