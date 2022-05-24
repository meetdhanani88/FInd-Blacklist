const { SignUp, SignIn, ResetPassword, forGotPassword } = require('../controller/User.controller')

const router = require('express').Router()

router.post('/user/SignUp',SignUp)
router.post('/user/SignIn',SignIn)
router.post('/user/ResetPassword',ResetPassword)
router.post('/user/forGotPassword',forGotPassword)

module.exports = router