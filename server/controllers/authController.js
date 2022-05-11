const bcrypt = require('bcrypt')

const { userModel } = require('../models')

async function createUser (req, res) {
  const { username, password, sshKey } = req.body

  if (!username || !password || !sshKey) {
    return res.status(400).json({ message: 'Username, password and ssh-key are required.' })
  }

  // check for duplicate username in the db
  const [error, duplicateUser] = await db.getUser(username)

  if (duplicateUser.length) {
    return res.sendStatus(409) // Conflict
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = { name: username, passwordHash, sshKey }
    await db.insertUser(newUser)
    res.status(201).json({ success: `New user ${username} created!` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  createUser
}
