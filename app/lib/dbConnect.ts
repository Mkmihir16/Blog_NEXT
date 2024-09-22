import mongoose, { Connection, Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Extend the global object to include mongoose
declare global {
    var mongoose: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
    };
}

// Initialize the cached variable
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
          bufferCommands: false,
        };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('MongoDB connected successfully');  // Log a message when connected
        return mongoose;
      }).catch(err => {
        console.error('MongoDB connection error:', err);  // Log any errors during connection
        throw err;  // Make sure to throw the error if connection fails
      });
    cached.conn = await cached.promise;
    return cached.conn;
}
}

export default dbConnect;
