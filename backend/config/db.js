import mongoose from "mongoose";

const connectdb = async () =>{
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb connected successfully!");
    } catch (error) {
        console.log("An error occured while connecting to database "+error);
    }
}

export default connectdb;