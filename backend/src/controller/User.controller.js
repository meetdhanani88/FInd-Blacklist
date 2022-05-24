
const main = require("../middleware/mailer");
const User = require("../models/User.model");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.SignUp = (req, res) => {
    const { email } = req.body
    try {
        User.findOne({ email: email, Role: 'Admin' }).exec(async (err, user) => {

            if (err) return res.status(400).json(err)
            if (user) {
                const pass = 'PlayBoy'

                await User.findOneAndUpdate({ email: user.email }, {
                    Password: pass
                })
                return res.status(200).json({
                    message: 'Successfully send Password To Admin Email'
                })
            } else {
                return res.status(404).json({
                    message: 'You are not Allow for Admin Access'
                })
            }
        });
    } catch (err) {
        return res.status(400).json(err)
    }

};


exports.SignIn = (req, res) => {
    const { email, password } = req.body
    try {
        User.findOne({ email: email, Role: 'Admin' }).exec(async (err, user) => {

            if (err) return res.status(400).json(err)
            if (user) {

                if (user.Password === password) {
                    const token = await jwt.sign({ user: user }, process.env.JWT_KEY, { expiresIn: '1d' })
                    return res.status(200).json({
                        message: 'Login Successfully',
                        user: user,
                        token: token
                    })
                } else {
                    return res.status(400).json({
                        message: 'Password Is Wrong'
                    })
                }
            } else {
                return res.status(404).json({
                    message: 'You are not Allow for Admin Access'
                })
            }
        });
    } catch (err) {
        return res.status(400).json(err)
    }
}

exports.ResetPassword = (req, res) => {
    const { email, password, newPassword } = req.body
    try {
        User.findOne({ email: email }).exec(async (err, user) => {
            if (err) return res.status(400).json(err)
            if (user) {


                if (user.Password === password) {

                    await User.updateOne({ _id: user._id }, {
                        Password: newPassword
                    }, { new: true })
                    return res.status(200).json({
                        message: 'Password updated'
                    })
                } else {
                    return res.status(400).json({
                        message: 'Your Old Password Is Wrong'
                    })
                }
            } else {
                return res.status(404).json({
                    message: 'User Not Found..'
                })
            }
        })
    } catch (err) {
        return res.status(400).json(err)
    }
}
//  function genPassword() {
//     var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     var passwordLength = 12;
//     var password = "";
//  for (var i = 0; i <= passwordLength; i++) {
//    var randomNumber = Math.floor(Math.random() * chars.length);
//    password += chars.substring(randomNumber, randomNumber +1);
//   }
//         return password
//  }
exports.forGotPassword = (req,res)=>{
    const {email} = req.body

    try{
            User.findOne({email:email}).exec(async(err,user)=>{
                if(err) return res.status(400).json(err)
                if(user){
                   await main(user.email,user.Password)
                    return res.status(200).json({
                        message : "Password Sent on Email"
                    })
                }else{
                    return res.status(404).json({
                        message : 'User Not Found'
                    })
                }
            })

    }catch(err){
        return res.status(400).json(err)
    }
}
