const bcrypt = require('bcrypt')

const { userModel } = require('../models')

const setupUser = require('../utils/setupUser')

async function createUser (req, res) {
  const { username, password, sshKey } = req.body

  if (!username || !password || !sshKey) {
    return res
      .status(400)
      .json({ message: 'Username, password and ssh-key are required.' })
  }

  // check for duplicate username in the db
  const [error, duplicateUser] = await userModel.getUser(username)

  if (duplicateUser.length) {
    return res.sendStatus(409) // Conflict
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = { name: username, passwordHash, sshKey }
    await userModel.insertUser(newUser)
    await setupUser(newUser)
    res.status(201).json({ success: `New user ${username} created!` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function verifyUser (req, res) {
  const { username, password } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required.' })
  }

  const [error, foundUser] = await userModel.getUser(username)

  if (!foundUser.length) return res.sendStatus(401) // Unauthorized

  const user = foundUser[0]

  // evaluate password
  const match = await bcrypt.compare(password, user.password)
  if (match) {
    // create session
    req.session.user = {
      name: username
    }

    res
      .cookie('tokenExists', 'true', {
        expires: new Date(new Date().getTime() + 100 * 1000),
        httpOnly: false
      })
      .sendStatus(200)
  } else {
    res.sendStatus(401)
  }
}

module.exports = {
  createUser,
  verifyUser
}
