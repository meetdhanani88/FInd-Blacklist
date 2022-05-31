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
},{timestamps:true,toObject:{virtuals:true}})

// userSchema.virtual("Role", {
//     type : mongoose.Schema.Types.ObjectId,
//     ref: "Role",
//     foreignField: "id",
//     localField: "roleId",
//   });
module.exports = mongoose.model('User',userSchema)



