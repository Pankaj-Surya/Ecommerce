const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user')

dotenv.config();


mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("DB COnnection successfully"))
.catch((err) => {
    console.log(err)
})

app.use(express.json())
app.use("/api/user",userRoute)

app.listen(process.env.PORT  || 5000, () => {
    console.log("Backend server listening on port")
})
console.log("hello world!");

//mongodb+srv://<username>:<password>@cluster0.62scxyt.mongodb.net/?retryWrites=true&w=majority