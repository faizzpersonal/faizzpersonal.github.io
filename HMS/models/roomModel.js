const mongoose = require("mongoose")



const roomSchema = new mongoose.Schema({
    room_no:{
        type:String,
        required:true
    },
    room_type:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    room_status:{
        type:String,
        required:true
    }
    
})



const Room = mongoose.model("Room",roomSchema)


module.exports= Room