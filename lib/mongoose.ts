import mongoose, { ConnectOptions, Mongoose } from "mongoose";

if (!process.env.DATABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "DATABASE_URL"');
}

const uri = process.env.DATABASE_URL;

const options = {};

let clientPromise: Promise<Mongoose>;

if (process.env.NODE_ENV === "development") {
  let globalMongo = global as typeof globalThis & {
    isConnected?: Promise<Mongoose>;
  };

  if (!globalMongo.isConnected) {
    globalMongo.isConnected = mongoose.connect(uri, options as ConnectOptions);
  }
  clientPromise = globalMongo.isConnected;
} else {
  try {
    clientPromise = mongoose.connect(uri, options as ConnectOptions);
  } catch (err) {
    // console.log(err);
  }
  clientPromise = mongoose.connect(uri, options as ConnectOptions);
}

export default clientPromise;
