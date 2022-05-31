const mongoose = require('mongoose')
const BlacklistedVendorsSchema = new mongoose.Schema({
    vendorName : {
        type : String,
        required : true,
        trim : true
    },
    address : {
        type : String,
        required : true,
        trim : true
    },
    reason : {
        type : String,
        required : true,
        trim : true
    },
    image : {
        type : String,
        trim : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        trim : true,
        ref : 'User'
    }, 
    adminId : {
        type : mongoose.Schema.Types.ObjectId,
        trim : true,
        ref : 'User'
    }, 
},{timestamps:true})



module.exports = mongoose.model('BlacklistedVendors',BlacklistedVendorsSchema)



