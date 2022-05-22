const Hr = require('../models/hrModel')

const hrDashboard = async (req, res) => {
    try {
        const hrData = await Hr.find({})
        res.render("dashboard", { hrs: hrData })
    } catch (error) {
        console.log(error.message)
    }
}
const newHrLoad = async (req, res) => {
    try {
        res.render("new-hr")
    } catch (error) {
        console.log(error.message)
    }
}
const addHr = async (req, res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const role = req.body.role

        const hr = new Hr({
            name:name,
            email:email,
            role:role,

        })

        const hrData =await hr.save()

        if(hrData){
            res.redirect("/admin/home/hr")

        }
        else{
            res.render("new-hr",{message:"Something Went Wrong"})
        }



    } catch (error) {
        console.log(error.message)
    }
}
const editHrLoad = async (req, res) => {
    try {
        const id = req.query.id
        const hrData = await Hr.findById({_id:id})
        if(hrData){
            res.render("edit-hr",{hr:hrData})
        }
        else{
            res.redirect("/admin/home/hr")
        }
    } catch (error) {
        console.log(error.message)
    }
}
const updateHr = async (req, res) => {
    try {
        const hrData = await Hr.findByIdAndUpdate({_id:req.body.id},{ $set:{
            name:req.body.name,
            email:req.body.email,
            role:req.body.role
        }})
        res.redirect("/admin/home/hr")
    } catch (error) {
        console.log(error.message)
            
    }
}
const deleteHr = async (req, res) => {
    try {
        const id = req.query.id
        await Hr.deleteOne({_id:id})
        res.redirect("/admin/home/hr")
    } catch (error) {
        console.log(error.message)
    }
}
module.exports={
    hrDashboard,
    newHrLoad,
    addHr,
    editHrLoad,
    updateHr,
    deleteHr
}