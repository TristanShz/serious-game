import * as mongoose from "mongoose";
import { apiConfig } from "../_config/config";

if (!apiConfig.mongo.uri) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
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
            pass: apiConfig.mongo.pass,
            user: apiConfig.mongo.user,
        };

        cached.promise = mongoose.connect("mongodb://" + apiConfig.mongo.uri, opts).then((mongoose) => {
            console.log("CONNECTED TO MONGODB SUCCESSFULLY : ", process.env.MONGO_URI);

            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
