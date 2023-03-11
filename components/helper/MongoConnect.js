import mongoose from "mongoose";

export async function connectMongoDB() {
  const url = `mongodb+srv://kit1:${process.env.mongoAPI}@cluster0.dc50xli.mongodb.net/events`;

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  return await mongoose.connect(url, { useNewUrlParser: true });
}
