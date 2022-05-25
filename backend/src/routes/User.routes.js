const { SignUp, SignIn, ResetPassword, forGotPassword, createUser, getAllUsers, deleteUser, updateUser, inActivePlane, ActivePlane } = require('../controller/User.controller')
const { requireSignIn } = require('../middleware')

const router = require('express').Router()

router.post('/user/SignUp',SignUp)
router.post('/user/SignIn',SignIn)
router.post('/user/ResetPassword',ResetPassword)
router.post('/user/forGotPassword',forGotPassword)
router.post('/user/createUser',requireSignIn,createUser)
router.get('/user/getAllUsers',requireSignIn,getAllUsers)
router.post('/user/deleteUser/:id',requireSignIn,deleteUser)
router.post('/user/updateUser/:id',requireSignIn,updateUser)
router.post('/user/inActivePlane/:id',requireSignIn,inActivePlane)
router.post('/user/ActivePlane/:id',requireSignIn,ActivePlane)

module.exports = router