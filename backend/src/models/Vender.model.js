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
        ref : 'User'
    },
    Requested_Status: { 
        type : String,
        trim : true,
        enum :['Accept','Reject','Pending']
    },
    dateOfBlackListed :{
        type : Date,
        trim : true
    }

   
},{})
module.exports = mongoose.model('Vendors',vendorSchema)



