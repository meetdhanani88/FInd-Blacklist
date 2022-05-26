const  express = require('express')
const app = express()
require('dotenv').config()
require('./db/coon')
const PORT = process.env.PORT
const cors = require('cors')
const userRoutes = require('./routes/User.routes')
const vendorRoutes = require('./routes/Vendor.routes')



//All Routes
app.use(cors())
app.use(express.json())

app.use('/api',userRoutes)
app.use('/api',vendorRoutes)



app.listen(PORT,()=>{
    console.log(`Server is Running On PORT : ${PORT}`);
})