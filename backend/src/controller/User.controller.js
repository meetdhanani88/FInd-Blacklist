const User = require("../models/User.model");

exports.SignUp = (req,res) => {
  const {
    firstName,
    lastName,
    email,
    MobileNo,
    Subscription_Plan,
    Expiry_Date,
    Password
  } = req.body;
  try {
    User.findOne({ email: email }).exec((err, user) => {
        if(err) return res.status(400).json(err)
        if(user){
          return res.status(400).json({
              message : 'User Already Existed'
          })
        }else{
              const _user = User({firstName,
                  lastName,
                  email,
                  MobileNo,
                  Subscription_Plan,
                  Expiry_Date,
                  Password,
                Role : 'Admin'})
                  _user.save((err,user)=>{
                      if(err) return res.status(400).json(err)
                      if(user){
                          return res.status(201).json({
                              message : 'SignUp Successfully',
                              user : user
                          })
                      }
                  })
        }
    });
  }catch(err){
      return res.status(400).json(err)
  }
  
};
