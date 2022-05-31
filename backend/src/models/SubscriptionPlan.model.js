const mongoose  = require('mongoose')

const subscriptionPlanSchema = new mongoose.Schema({
    plan: {
        type: String,
        required : true
    },
    expiryDate : {
        type : Date,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{_id : false})
module.exports = mongoose.model('SubscriptionPlan',subscriptionPlanSchema)