import mongoose from "mongoose";
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log(`Database is connected successfully`);
    } catch (err) {
        console.log(`Failed to connect database`, err)
    }
}