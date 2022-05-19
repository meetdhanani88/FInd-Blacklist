const mongoose = require('mongoose')
const DB = process.env.DB
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASS = process.env.MONGO_PASS
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.gyf4z.mongodb.net/${DB}?retryWrites=true&w=majority`)
.then(()=>{
    console.log('DataBase Connected');
}).catch(err=>{console.log(err)})