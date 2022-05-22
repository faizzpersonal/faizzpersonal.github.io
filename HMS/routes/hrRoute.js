const express = require("express")
const hr_route =express()

// const session = require("express-session")
// hr_route.use(session({
//     name : 'codeil',
//     secret : 'something',
//     resave :false,
//     saveUninitialized: true,
//     cookie : {
//             maxAge:(1000 * 60 * 100)
//     }      
// }));



hr_route.set('view engine','ejs')
hr_route.set('views','./views/hr')

const bodyParser = require('body-parser')
hr_route.use(bodyParser.json())
hr_route.use(bodyParser.urlencoded({ extended: true }))

const hrController = require("../controllers/hrController")


hr_route.get("/",hrController.hrDashboard)

hr_route.get("/new-hr",hrController.newHrLoad)
hr_route.post("/new-hr",hrController.addHr)

hr_route.get("/edit-hr",hrController.editHrLoad)
hr_route.post("/edit-hr",hrController.updateHr)

hr_route.get("/delete-hr",hrController.deleteHr)

module.exports = hr_route