const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.URL ;
// const URL="mongodb://127.0.0.1:27017/tasty_burger";

const connectDB = async ()=> {
    try {
        await mongoose.connect(URL);
        console.log("Connection successfull");        
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;