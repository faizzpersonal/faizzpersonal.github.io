const mongoose = require("mongoose")



const hrSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    } 
})



const Hr = mongoose.model("Hr",hrSchema)


module.exports= Hr