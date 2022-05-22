const express = require("express")
const room_route =express()

// const session = require("express-session")
// room_route.use(session({
//     name : 'codeil',
//     secret : 'something',
//     resave :false,
//     saveUninitialized: true,
//     cookie : {
//             maxAge:(1000 * 60 * 100)
//     }      
// }));



room_route.set('view engine','ejs')
room_route.set('views','./views/room')

const bodyParser = require('body-parser')
room_route.use(bodyParser.json())
room_route.use(bodyParser.urlencoded({ extended: true }))

const roomController = require("../controllers/roomController")


room_route.get("/",roomController.roomDashboard)


room_route.get("/edit-room",roomController.editRoomLoad)
room_route.post("/edit-room",roomController.updateRoom)


module.exports = room_route