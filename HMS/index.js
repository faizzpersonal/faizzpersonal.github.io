express = require("express")
app = express()


const mongoose = require("mongoose");

const url = "mongodb+srv://faizzpersonal:159357abcd@cluster0.3ahyh.mongodb.net/hms?retryWrites=true&w=majority";

mongoose.connect(url, (err) => {
    if (err) throw err;
    console.log("Connected To Database");
});

const start =app.use(express.static("/Users/faizzpersonal/Documents/Code/HMS/public/Project"));

const userRoute = require("./routes/userRoute")
app.use('/', userRoute)

const adminRoute = require("./routes/adminRoute")
app.use('/admin', adminRoute)

const hrRoute = require("./routes/hrRoute")
app.use('/admin/home/hr', hrRoute)

const roomRoute = require("./routes/roomRoutes")
app.use('/admin/home/room', roomRoute)

app.listen(4000, () => {
    console.log("Server Is Running")
})