const express = require('express')
const bodyParser = require('body-parser')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

require('dotenv').config()

const app = express()

app.use(bodyParser.json())

app.post('/new', (req, res) => {
  if (!req.body.repository) {
    return res.send(400).json({ message: 'repository not found' })
  }

  exec(`sshpass -p ${process.env.gitpass} ssh git@${process.env.gitserver} newrepo`, (error, stdout, stderr) => {
    if (error) {
      return res.send(500).json({ message: `${error.message}` })
    }
    if (stderr) {
      return res.send(449).json({ message: `${stderr}` })
    }
    return res.send(201).json({ message: `${stdout}` })
  })
})

app.listen(5000, () => console.log('listening on 5000'))
