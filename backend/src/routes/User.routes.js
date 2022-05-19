const { SignUp } = require('../controller/User.controller')

const router = require('express').Router()

router.post('/user/SignUp',SignUp)

module.exports = router