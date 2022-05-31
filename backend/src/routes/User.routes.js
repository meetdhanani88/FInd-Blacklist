<<<<<<< HEAD
const { SignUp, SignIn, ResetPassword, forGotPassword, createUser, getAllUsers, deleteUser, updateUser, inActivePlan, ActivePlan, createRole, userActiveOrInActive } = require('../controller/User.controller')
=======
const { SignUp, SignIn, ResetPassword, forGotPassword, createUser, getAllUsers, deleteUser, updateUser, inActivePlan, ActivePlan, auth } = require('../controller/User.controller')
>>>>>>> dev
const { requireSignIn } = require('../middleware')

const router = require('express').Router()

router.post('/user/SignUp', SignUp)
router.post('/user/SignIn', SignIn)
router.post('/user/ResetPassword', ResetPassword)
router.post('/user/forGotPassword', forGotPassword)
router.post('/user/createUser', requireSignIn, createUser)
router.get('/user/getAllUsers', requireSignIn, getAllUsers)
router.post('/user/deleteUser/:id', requireSignIn, deleteUser)
router.post('/user/updateUser/:id', requireSignIn, updateUser)
<<<<<<< HEAD
router.post('/user/userActiveOrInActive/:id', requireSignIn, userActiveOrInActive)
=======
router.post('/user/inActivePlan/:id', requireSignIn, inActivePlan)
router.post('/user/ActivePlan/:id', requireSignIn, ActivePlan)
router.get('/user/auth', requireSignIn, auth)
>>>>>>> dev

module.exports = router