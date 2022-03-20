    const express= require('express')
    const { dirname } = require('path')
    const app=express()
    const path=require('path')
    const hbs=require('hbs')
    var Seat=require('./models/registers')



    require('./db/connect')
    const port=process.env.PORT || 3000
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));

    const static_path = path.join(__dirname,"../public")
    const template_path=path.join(__dirname,"../templates/views")
    const partial_path=path.join(__dirname,"../templates/partials")
    app.use(express.static(static_path))
    app.set("view engine","hbs")
    app.set("views",template_path)
    hbs.registerPartials(partial_path)
  


    app.get('/',(req,res)=>{
        res.render("index", {
            names:'jasveen',
            title:'Train Ticket Booking Website'
    })
    });

   
    app.post("/get_seats",async(req,response)=>{
        var input;    
        input= req.body.seats
        var result = "";
            await check()
    async function check()
            {
            var Seats = await Seat.findOne({});
            if(Seats == null){
                await initalise();
                Seats = await Seat.findOne({});
            }
            var ct = 0;
            // console.log(Seats);
            var SeatString = Seats.value;
            for(var i=0;i<80;i++){
                if(SeatString[i] == '0'){
                    ct++;
                }
            }
            console.log(ct);
            if(ct >= input && input <= 7){
                updateSeats(SeatString);
            }else{
                console.log("Not Possible");
                result+='Not Possible!'
            }
    }
    async function updateSeats(SeatString){
        var SeatArray = SeatString.split("");
        var start = 0;
        for(var i=0;i<11;i++){
            var ct = 0;
            for(var j=0;j<7;j++){
                if(SeatString[start++] == '0'){
                    ct++;
                }
            }
            if(ct >= input){
                console.log("Empty row found");
                
                start -= 7;
                for(j=0;j<7;j++){
                    if(SeatString[start] == '0'){
                        SeatArray[start++] = '1';
                        var row_number = i+1;
                        var col_number = j+1;
                        result += "Seat number " + row_number + " " +col_number + "<br>";
                        console.log("Seat number ",i+1," ",j+1);
                        input--;
                    }else{
                        start++;
                    }
                    if(input == 0){
                        var newSeatsString = SeatArray.join("");
                        console.log(newSeatsString);
                        await Seat.findOneAndUpdate({name: "Seats"},{$set: {value: newSeatsString }});
                        return;
                    }
                }
            }
        }
        console.log("Empty row not found");
        var start = 0;
        var SeatArray = SeatString.split("");
        for(var i=0;i<11;i++){
            for(var j=0;j<7;j++){
                if(SeatString[start] == '0'){
                    SeatArray[start++] = '1';
                    var row_number = i+1;
                    var col_number = j+1;
                    result += "Seat number " + row_number + " " +col_number + "<br>";
                    console.log("Seat number ",i+1," ",j+1);
                    input--;
                }else{
                    start++;
                }
                if(input == 0){
                    var newSeatsString = SeatArray.join("");
                    console.log(newSeatsString);
                    await Seat.findOneAndUpdate({name: "Seats"},{$set: {value: newSeatsString }});
                    return;
                }
            }
        }

        for(var i=0;i<3;i++){
            if(SeatString[start] == '0'){
                SeatArray[start++] = '1';
                var row_number = 12;
                var col_number = i+1;
                result += "Seat number " + row_number + " " +col_number + "<br>";
                console.log("Seat number ",i+1," ",j+1);
                input--;
            }else{
                start++;
            }
            if(input == 0){
                var newSeatsString = SeatArray.join("");
                console.log(newSeatsString);
                await Seat.findOneAndUpdate({name: "Seats"},{$set: {value: newSeatsString }});
                return;
            }
        }
    }
    async function initalise()
    {
        var SeatString = "";
        for(var i=0;i<80;i++){
            SeatString += '0';
        }
        await Seat.create({name: "Seats",value: SeatString});
        console.log(SeatString);
    }
    if (input !== "") {
        response.send("\n \nYour seats are <br>" + result  + '<br/>');
    } else {
        response.send("Please provide us no of seats");
    }
});
    app.listen(port,()=>{
        console.log('server is listening is port 3000');
    })

  

