'use strict'

// require is not defined
// const api = require('./api')

const onSignUp = function (event) {
  event.preventDefault()

  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
}

// module.exports = {
//   addHandlers
// }
