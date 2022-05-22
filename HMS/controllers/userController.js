const User = require('../models/userModel')

const bcrypt = require("bcrypt")

const securePassword = async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password,10)
        return passwordHash

    } catch (error) {
        console.log(error.message)
    }
}
const loadRegister= async(req,res)=>{
    try {
        res.render('registration')
    } catch (error) {
        console.log(error.message)
    }
}
const start= async(req,res)=>{
    try {
        res.render('start')
    } catch (error) {
        console.log(error.message)
    }
}
const insertUser= async(req,res)=>{
    try {
        const pass = await securePassword(req.body.password)
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:pass,
            is_admin:0,
            check_in:0,
            check_out:0,
            no_of_room:0,
            room_type:0
        })
        const userData = await user.save()

        if (userData) {
            res.render("registration",{message:"Registration Has Completed Successfully"})
        } else {
            res.render("registration",{message:"Registration Has Failed"})
        }
    } catch (error) {
        console.log(error.message)
    }
}
const loginLoad = async(req,res)=>{
    try {
        res.render("login")
        
    } catch (error) {
        console.log(error.message)
    }
}
const verifyLogin = async(req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        
        const userData = await User.findOne({email:email})
        
        if(userData){
            const passwordMatch = await bcrypt.compare(password,userData.password)
            if(passwordMatch){
                req.session.user_id = userData._id
                res.redirect("/home")  
            }
            else{
                res.render("login",{message:"Password is Incorrect"})
            }
        }
        else{
            res.render("login",{message:"Email is Incorrect"})
        }
    } catch (error) {
        console.log(error.message)
    }
}
const loadHome= async(req,res)=>{
    try {
        const userData= await User.findById({_id:req.session.user_id})
        res.render('home',{user:userData})
    } catch (error) {
        console.log(error.message)
    }
}
const userLogout= async(req,res)=>{
    try {
        req.session.destroy()
        res.redirect("/login")
    } catch (error) {
        console.log(error.message)
    }
}
const insertData= async(req,res)=>{
    try {
        const userData = await User.findByIdAndUpdate({_id:req.body.user_id},{ $set:{check_in:req.body.check_in},check_out:req.body.check_out,no_of_room:req.body.no_of_room,room_type:req.body.room_type})
        res.redirect("/booking")
    }
    
    catch (error) {
        console.log(error.message)
    }
}
const loadBooking= async(req,res)=>{
    try {
        const userData= await User.findById({_id:req.session.user_id})
        res.render('booking',{user:userData})
    } catch (error) {
        console.log(error.message)
    }
}



module.exports={
    loadRegister,
    start,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    insertData,
    loadBooking
}