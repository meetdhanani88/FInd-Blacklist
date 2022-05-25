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
    Reason : {
        type : String,
        required : true,
        trim : true
    },
    BlackList_Status : {
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
        ref : 'User',
        required:true
    },
    Requested_Type: { 
        type : Date,
        trim : true,
        enum :['Accept','Reject']
    }
   
},{timestamps:true})



module.exports = mongoose.model('Vendors',vendorSchema)



