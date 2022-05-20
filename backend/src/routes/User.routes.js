const { SignUp, SignIn } = require('../controller/User.controller')

const router = require('express').Router()

router.post('/user/SignUp',SignUp)
router.post('/user/SignIn',SignIn)

module.exports = router