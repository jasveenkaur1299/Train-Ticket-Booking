const mongoose=require('mongoose')

const seatSchema= new mongoose.Schema({
    name: String,
    value:String
})

const SeatsBooked = new mongoose.model("SeatsBooked",seatSchema);

module.exports=SeatsBooked;