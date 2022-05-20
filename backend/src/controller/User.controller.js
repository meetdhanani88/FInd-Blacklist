
// const main = require("../middleware/mailer");
const User = require("../models/User.model");
const jwt = require('jsonwebtoken')

exports.SignUp = (req, res) => {
    const { email } = req.body
    try {
        User.findOne({ email: email, Role: 'Admin' }).exec(async (err, user) => {

            if (err) return res.status(400).json(err)
            if (user) {
                const pass = 'Playboy@8'
                const hashPass = await user.passwordBcrypt(pass)
                await User.findOneAndUpdate({ email: user.email }, {
                    Password: hashPass
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
                const isMatch = await user.authenticate(password)
                if (isMatch) {
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
