const { SignUp, SignIn, ResetPassword } = require('../controller/User.controller')

const router = require('express').Router()

router.post('/user/SignUp',SignUp)
router.post('/user/SignIn',SignIn)
router.post('/user/ResetPassword',ResetPassword)

module.exports = router