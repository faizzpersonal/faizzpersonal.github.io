const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_admin:{
        type:Number,
        required:true
    },
    check_in:{
        type:String,
        required:true
    },
    check_out:{
        type:String,
        required:true
    },
    no_of_room:{
        type:Number,
        required:true
    },
    room_type:{
        type:String,
        required:true
    }
    
})



const User = mongoose.model("User",userSchema)


module.exports= User