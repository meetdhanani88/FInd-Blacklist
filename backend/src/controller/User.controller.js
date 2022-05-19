
const main = require("../middleware/mailer");
const User = require("../models/User.model");

exports.SignUp = (req,res) => {
 const {email} = req.body
  try {
    User.findOne({ email: email,Role:'Admin'}).exec(async(err, user) => {
        
        if(err) return res.status(400).json(err)
        if(user){
            const pass = await genPassword()
            const hashPass = await user.passwordBcrypt(pass)
           await main(user.email,pass)
           await User.findOneAndUpdate({email :user.email},{
                Password : hashPass   
           })
            return res.status(200).json({
                message : 'Successfully send Password To Admin Email'
            })
        }else{
            return res.status(404).json({
                message : 'You are not Allow for Admin Access'
            })
        }
    });
  }catch(err){
      return res.status(400).json(err)
  }
  
};
 function genPassword() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 12;
    var password = "";
 for (var i = 0; i <= passwordLength; i++) {
   var randomNumber = Math.floor(Math.random() * chars.length);
   password += chars.substring(randomNumber, randomNumber +1);
  }
        return password
 }
