const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/SeatBooking",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex:true
}).then(()=>{
    console.log("Connection to the database was successful")
}).catch((e)=>{
    console.log(e)
})