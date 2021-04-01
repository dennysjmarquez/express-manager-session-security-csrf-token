const { response, request } = require('express')

/**
 *
 * Middleware que expone la base de datos de usuario usando a express locals
 *
 */
const usersDb = (req = request, res = response, next) => {

  // Se crea una sola vez
  if (req.localsApp.usersDb) {

    next()
    return
  }

  // TODO: esto va en una Db para este ejemplo lo dejó o así, a darle tomos 💪🏻
  req.localsApp.usersDb = [
    { id: 1, name: 'Dennys', email: 'dennysjmarquez@gmail.com', password: '123456' },
    { id: 2, name: 'Jose', email: 'jose@gmail.com', password: '123456' },
    { id: 3, name: 'Angela', email: 'angela@gmail.com', password: '123456' },
  ]

  next()

}

module.exports = {
  usersDb
}
