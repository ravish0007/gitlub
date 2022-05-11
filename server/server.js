const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

require('dotenv').config()

const { repoRoute } = require('./routes')

const app = express()

app.use(cors({ origin: process.env.UI_ROOT, credentials: true }))
app.use(bodyParser.json())

app.use('/api/repo', repoRoute)

app.listen(5000, () => console.log('listening on 5000'))
