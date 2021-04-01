const { response, request } = require('express')

const render = (req, res, errors = {}) => {

  const { userLogin = false } = req.session

  return res.render('index', {
    body: 'pages/login',
    userLogin,
    error: null,
    notUser: null,
    missingData: null,
    ...errors,
    title: 'Login'
  })

}

const loginView = (req = request, res = response) => {

  return render(req, res)

}

// Depende del del middleware db.middleware
const login = (req = request, res = response, next) => {

  const { email, password } = req.body

  if (!email || !password) {

    return render(req, res, {
      error: true,
      missingData: true
    })

  }

  const user = req.localsApp.usersDb.find(user => user.email === email && user.password === password)  // TODO: password hash

  if (user) {

    req.session.userId = user.id
    req.session.user = user
    req.session.userLogin = true

    req.session.save(function (err) {

      if (err) {
        return res.redirect('/login')
      }

      return res.redirect('/dashboard')

    })

  } else {

    return render(req, res, {
      error: true,
      notUser: true
    })

  }

}

module.exports = {
  loginView,
  login
}
