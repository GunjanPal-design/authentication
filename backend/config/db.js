const mongoose = require("mongoose")
const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/data")
        console.log("database connected")
    } catch (err) {
        console.log("database is not connected",err)
    }
}
module.exports = connectDb



