const { response, request } = require('express')

const indexView = (req = request, res = response) => {

  const { userLogin = false } = req.session

  res.render('index', {
    body: 'pages/home',
    userLogin
  })

//   res.send(`
//   <h1>Sesiones con Express</h1>
//
//   ${userId !== '' ? `
//
//     <a href="/dashboard">Dashboard</a>
//
//     <form method="post" action="/logout">
//         <button>Logout</button>
//     </form>
//
//     ` : `
//
//     <a href="/login">Login</a>
//     <a href="/register">Register</a>
//
//     `
//   }
// `)

}

module.exports = {
  indexView
}
