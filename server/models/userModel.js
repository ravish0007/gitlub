const Pool = require('pg').Pool

const config = require('../config')

const pool = new Pool(config.db)

async function insertUser (user) {
  try {
    const result = await pool.query('INSERT INTO users (username, password, ssh_key) values ($1, $2, $3) RETURNING user_id', [user.name, user.passwordHash, user.sshKey])
    return [null, result.rows[0]]
  } catch (error) {
    return [error, null]
  }
}

async function getUser (username) {
  try {
    const result = await pool.query('SELECT * FROM users where user_name = $1 RETURNING user_id', [username])
    return [null, result.rows[0]]
  } catch (error) {
    return [error, null]
  }
}

module.exports = {
  insertUser,
  getUser
}
