import mongoose from "mongoose";

export default function connectDB() {
    mongoose
        .connect(process.env.DB_URI ?? "")
        .then(() => {
            console.log("Connected to Mongo DB");
        })
        .catch((e) => {
            console.log(e);
        });
}
