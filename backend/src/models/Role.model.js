const mongoose  = require('mongoose')

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    _id :  { type: Number }
    
})
module.exports = mongoose.model('Role',roleSchema)