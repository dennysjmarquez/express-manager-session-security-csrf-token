const { SESSION_NAME } = require('../middlewares/session.middleware')
const { response, request } = require('express')

const logoutView = (req = request, res = response) => {

  req.session.destroy(err => {

    if (err) {
      return res.redirect('/dashboard')
    }

    res.clearCookie(SESSION_NAME)
    res.redirect('/login')

  })

}

module.exports = {
  logoutView
}
