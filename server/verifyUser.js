async function verifyUser (req, res, next) {
  const user = req.session.user

  if (!user || !Object.entries(user).length) {
    return res.clearCookie('tokenExists').redirect(process.env.UI_ROOT)
  }

  req.locals.user = user
  next()
}

module.exports = verifyUser
