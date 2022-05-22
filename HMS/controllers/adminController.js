const User = require('../models/userModel')

const bcrypt = require("bcrypt")



const loadLogin = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message)
    }
}
const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password


        const userData = await User.findOne({ email: email })
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password)

            if (passwordMatch) {
                if (userData.is_admin === 1) {
                    req.session.user_id = userData._id
                    res.redirect("/admin/home")
                }
                else {
                    res.render("login", { message: "You Are Not Admin" })
                }

            }
            else {
                res.render("login", { message: "Password is Incorrect" })
            }
        }
        else {
            res.render("login", { message: "Email is Incorrect" })
        }
    } catch (error) {
        console.log(error.message)
    }
}
const loadDashboard = async (req, res) => {
    try {
        const userData = await User.findById({ _id: req.session.user_id })
        res.render('home', { user: userData })
    } catch (error) {
        console.log(error.message)
    }
}
const logout = async (req, res) => {
    try {
        req.session.destroy()
        res.redirect("/admin")
    } catch (error) {
        console.log(error.message)
    }
}
const adminDashboard = async (req, res) => {
    try {
        const usersData = await User.find({ is_admin: 0 })
        res.render("dashboard", { users: usersData })
    } catch (error) {
        console.log(error.message)
    }
}
const newUserLoad = async (req, res) => {
    try {
        res.render("new-user")
    } catch (error) {
        console.log(error.message)
    }
}
const addUser = async (req, res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const check_in = req.body.check_in
        const check_out = req.body.check_out
        const room_type = req.body.room_type

        const user = new User({
            name:name,
            email:email,
            check_in:check_in,
            check_out:check_out,
            room_type:room_type,
            no_of_room:0,
            password:0,
            is_admin:0

        })

        const userData =await user.save()

        if(userData){
            res.redirect("/admin/dashboard")

        }
        else{
            res.render("new-user",{message:"Something Went Wrong"})
        }



    } catch (error) {
        console.log(error.message)
    }
}
const editUserLoad = async (req, res) => {
    try {
        const id = req.query.id
        const userData = await User.findById({_id:id})
        if(userData){
            res.render("edit-user",{user:userData})
        }
        else{
            res.redirect("/admin/dashboard")
        }
    } catch (error) {
        console.log(error.message)
    }
}
const updateUsers = async (req, res) => {
    try {
        const userData = await User.findByIdAndUpdate({_id:req.body.id},{ $set:{
            name:req.body.name,
            email:req.body.email,
            check_in:req.body.check_in,
            check_out:req.body.check_out,
            room_type:req.body.room_type
        }})
        res.redirect("/admin/dashboard")
    } catch (error) {
        console.log(error.message)
            
    }
}
const deleteUser = async (req, res) => {
    try {
        const id = req.query.id
        await User.deleteOne({_id:id})
        res.redirect("/admin/dashboard")
    } catch (error) {
        console.log(error.message)
    }
}
const roomAllo = async (req, res) => {
    try {
        const usersData = await User.find({ is_admin: 0 })
        res.render("roomallocation", { users: usersData })
    } catch (error) {
        console.log(error.message)
    }
}
const roominfo = async (req, res) => {
    try {
        const id = req.query.id
        const userData = await User.findById({_id:id})
        if(userData){
            res.render("alloroom",{user:userData})
        }
        else{
            res.redirect("/admin/dashboard")
        }
    } catch (error) {
        console.log(error.message)
    }
}
const roomno = async (req, res) => {
    try {
        const userData = await User.findByIdAndUpdate({_id:req.body.id},{ $set:{
            no_of_room:req.body.no_of_room
        }})
        res.redirect("/admin/roomallocation")
    } catch (error) {
        console.log(error.message)
            
    }
}
module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    logout,
    adminDashboard,
    newUserLoad,
    addUser,
    editUserLoad,
    updateUsers,
    deleteUser,
    roomAllo,
    roominfo,
    roomno

}