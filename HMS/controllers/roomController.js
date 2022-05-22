const Room = require('../models/roomModel')

const roomDashboard = async (req, res) => {
    try {
        const roomData = await Room.find({})
        res.render("dashboard", { rooms: roomData })
    } catch (error) {
        console.log(error.message)
    }
}


const editRoomLoad = async (req, res) => {
    try {
        const id = req.query.id
        const roomData = await Room.findById({_id:id})
        if(roomData){
            res.render("edit-room",{room:roomData})
        }
        else{
            res.redirect("/admin/home/room")
        }
    } catch (error) {
        console.log(error.message)
    }
}
const updateRoom = async (req, res) => {
    try {
        const roomData = await Room.findByIdAndUpdate({_id:req.body.id},{ $set:{
            room_no:req.body.room_no,
            room_type:req.body.room_type,
            status:req.body.status,
            room_status:req.body.room_status
        }})
        res.redirect("/admin/home/room")
    } catch (error) {
        console.log(error.message)
            
    }
}

module.exports={
    roomDashboard,
    editRoomLoad,
    updateRoom
}