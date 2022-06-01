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
    },
    plan : {
        type :Number,
        ref :'SubscriptionPlan',
        required : true
    },
    expiryDate : {
        type : Date,
        required : true
    }
},{timestamps:true,toObject:{virtuals:true}})
// userSchema.virtual("SubscriptionPlan",{
//     ref : 'SubscriptionPlan',
//     foreignField : 'userId',
//     localField : "_id"
// })
// userSchema.virtual("Roles",{
//     ref : 'Role',
//     foreignField : '_id',
//     localField : "roleId"
// })
userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods = {
    authenticated : async function(pass){
        return await bcrypt.compare(pass,this.password)
    }
}

module.exports = mongoose.model('User',userSchema)



