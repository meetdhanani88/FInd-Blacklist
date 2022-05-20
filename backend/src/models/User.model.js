const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    MobileNo : {
        type : Number,
        trim : true
    },
    Role : {
        type : String,
        trim : true
    },
    Subscription_Plan  : {
        type : String,
        trim : true
    },
    Expiry_Date : {
        type : Date,
        trim : true
    },
    Password  : {
        type : String,
        trim : true
    },
})

userSchema.methods = {
    passwordBcrypt : async function(password){
        return await bcrypt.hash(this.Password,10)
    },
    authenticate : async function(pass){
        return  await bcrypt.compare(pass,this.Password)
        
    }
}

module.exports = mongoose.model('User',userSchema)



