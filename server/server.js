const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

require('dotenv').config()

const { repoRoute, authRoute } = require('./routes')
const verifyUser = require('./verifyUser')

const app = express()

app.use(cors({ origin: process.env.UI_ROOT, credentials: true }))

app.use(cookieSession({ secret: process.env.SESSION_SECRET, httpOnly: true, sameSite: 'strict' }))
app.use(cookieParser())

app.use(bodyParser.json())

app.use('/api/auth', authRoute)
app.use('/api/repo', repoRoute)
// app.use('/api/repo', verifyUser, repoRoute)

app.listen(5000, () => console.log('listening on 5000'))
