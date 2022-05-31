const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        trim : true
    },
    lastName : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    mobileNo : {
        type : Number,
        trim : true
    },
    roleId : {
        type : Number,
        ref : 'Role',
        required : true
    },
    password  : {
        type : String,
        trim : true
    },
    status : {
        type : Boolean,
        required : true,
        default : true,
    }
},{timestamps:true,toObject:{virtuals:true}})

module.exports = mongoose.model('User',userSchema)



