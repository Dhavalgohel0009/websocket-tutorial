import mongoose from "mongoose";

export const connectMongodb = async() => {
    await mongoose.connect(process.env.MONGO_URL, {})
        .then(()=> {
            console.log(`MongoDB connected : ${process.env.MONGO_URL}`)
        })
        .catch(err => console.error("MongoDB Connection Error:", err))
}