import mongoose from "mongoose";
import User from "../model/userModel";

export async function ConnectMongoDB() {
  const url = `mongodb+srv://kit1:${process.env.mongoAPI}@cluster0.dc50xli.mongodb.net/${process.env.mongodb_database}`;

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  await mongoose.connect(url, { useNewUrlParser: true });
}

export async function insertUser(newUser) {
  const user = new User({
    email: newUser.email,
    password: newUser.password,
  });

  await user.save();
}
