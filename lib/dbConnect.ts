import mongoose from "mongoose";

async function dbConnect() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000, // 30 seconds timeout
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection to MongoDB failed:', error);
        throw new Error('Connection failed!');
    }
}

export default dbConnect