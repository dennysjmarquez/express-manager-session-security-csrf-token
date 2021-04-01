const { response, request } = require('express')

const dashboardView = (req = request, res = response) => {

  const { userLogin = false } = req.session
  const sessionUserData = Object.entries(req.session.user)

  res.render('index', {
    body: 'pages/dashboard',
    userLogin,
    sessionUserData,
    title: 'Dashboard'
  })

}

module.exports = {
  dashboardView
}
