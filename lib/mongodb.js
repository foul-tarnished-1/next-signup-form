import mongoose from 'mongoose';

let cachedClient = null;
let cachedDb = null;

export async function connectMongoDB() {
    if (cachedClient && cachedDb) {
        return cachedDb;
    }

    try {
        const client = await mongoose.connect(process.env.MONGODB_URI);
        cachedClient = client;
        cachedDb = client.connection.db;
        console.log('Connected to MongoDB.');
        return cachedDb;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
