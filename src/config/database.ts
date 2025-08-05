
// import mongoose, { Mongoose } from 'mongoose';

// const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable');
// }

// // Extend global object to include mongoose caching
// declare global {
//   // eslint-disable-next-line no-var
//   var mongoose: {
//     conn: Mongoose | null;
//     promise: Promise<Mongoose> | null;
//   };
// }

// // Prevent TypeScript error in hot-reloading
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectToDatabase(): Promise<Mongoose> {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     mongoose.set('bufferCommands', false);
//     cached.promise = mongoose.connect(MONGODB_URI!);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

let cached = global.mongoose as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
