const mongoose = require('mongoose')
const vendorSchema = new mongoose.Schema({
    vendorName : {
        type : String,
        required : true,
        trim : true
    },
    Address : {
        type : String,
        required : true,
        trim : true
    },
    ReasonForUser : {
        type : String,
        trim : true
    },
    ReasonForAdmin : {
        type : String,
        trim : true
    },
    
    image : {
        type : String,
        trim : true
    },
    Requested_User : {
        type : mongoose.Schema.Types.ObjectId,
        trim : true,
        ref : 'User'
    },
    Admin : {
        type : mongoose.Schema.Types.ObjectId,
        trim : true,
        ref : 'User',
        required:true
    },
    Requested_Status: { 
        type : String,
        trim : true,
        enum :['Accept','Reject','Pending']
    },

   
},{timestamps:true})



module.exports = mongoose.model('Vendors',vendorSchema)



