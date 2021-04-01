const { response, request } = require('express')

const render = (req, res, errors = {}) => {

  const { userLogin = false } = req.session

  return res.render('index', {
    body: 'pages/register',
    userLogin,
    emailExit: null,
    ...errors,
    title: 'Register'
  })

}

const registerView = (req = request, res = response) => {

  return render(req, res)

}

const register = (req = request, res = response, next) => {

  const { name, email, password } = req.body

  if (name && email && password && !req.localsApp.usersDb.some(user => user.email === email)) {

    const user = {
      id: req.localsApp.usersDb.length + 1,
      name,
      email,
      password // TODO: hash
    }

    req.localsApp.usersDb.push(user)

    req.session.userId = user.id
    req.session.user = user
    req.session.userLogin = true

    req.session.save((err) => {

      if (err) {
        return res.redirect('/login')
      }

      return res.redirect('/dashboard')

    })

  } else {

    return render(req, res, { emailExit: true })

  }

}

module.exports = {
  registerView,
  register
}
