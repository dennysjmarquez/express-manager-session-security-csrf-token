const { response, request } = require('express')

const render = (req, res, opts = {}) => {

  return res.render('pages/emailEdit', {
    redirectLink: null,
    error: null,
    success: null,
    errorCsrf: null,
    ...opts
  })

}

const emailEditView = (req = request, res = response) => {

  const newEmail = req.body.email

  if (newEmail) {

    // TODO: Hay que verificar que el email no exista
    req.session.user.email = newEmail

    return render(req, res, {

      redirectLink: '/dashboard',
      success: true

    })

  } else {

    return render(req, res, {

      redirectLink: '/profile',
      error: true

    })

  }

}

module.exports = {
  emailEditView
}
