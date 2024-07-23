// lib/mongodb.js

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient = null;

export async function connectMongoDB() {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    const client = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedClient = client;
    console.log('Connected to MongoDB.');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Ensure the error is thrown to be handled by the caller
  }
}
