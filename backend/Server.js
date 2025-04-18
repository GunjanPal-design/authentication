const express = require("express")
const cors = require("cors")
const connectDb = require("./config/db")
const userRouter = require('./route/userRoute')


const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', userRouter);

connectDb()

app.listen(4000, () => {
    console.log("server is connected")
})