const express = require("express")
const user_route =express()

const session = require("express-session")
user_route.use(session({
    name : 'codeil',
    secret : 'something',
    resave :false,
    saveUninitialized: true,
    cookie : {
            maxAge:(1000 * 60 * 100)
    }      
}));

const auth = require("../middleware/auth")


user_route.set('view engine','ejs')
user_route.set('views','./views/users')

const bodyParser = require('body-parser')
user_route.use(bodyParser.json())
user_route.use(bodyParser.urlencoded({ extended: true }))

const userController = require("../controllers/userController")



user_route.get('/register',auth.isLogout,userController.loadRegister)
user_route.post('/register',userController.insertUser)

user_route.get('/login',auth.isLogout,userController.loginLoad)
user_route.post('/login',userController.verifyLogin)


user_route.get('/home',auth.isLogin,userController.loadHome)
user_route.post('/home',auth.isLogin,userController.insertData)

user_route.get('/booking',auth.isLogin,userController.loadBooking)

user_route.get('/logout',auth.isLogin,userController.userLogout)





module.exports= user_route
