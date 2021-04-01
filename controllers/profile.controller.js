const { response, request } = require('express')

// Depende del del middleware csrfTokens.middleware
const profileView = (req = request, res = response) => {

  const { userLogin = false } = req.session
  const userId = req.session.user.id
  const email = req.session.user.email
  const csrfToken = req.localsApp.csrfTokens.getNewCsrfToken(userId)

  if (!csrfToken) {

    return res.redirect('/dashboard')

  }

  res.render('index', {
    body: 'pages/profile',
    userLogin,
    csrfToken,
    email,
    title: 'Profiler'
  })

}

module.exports = {
  profileView
}
