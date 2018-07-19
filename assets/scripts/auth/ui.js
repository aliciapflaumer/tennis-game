'use strict'

const signUpSuccess = function (data) {
  console.log('Successfully signed up')
}

const signUpFailure = function (data) {
  console.log('Error on sign up')
}

module.exports = {
  signUpSuccess
}
