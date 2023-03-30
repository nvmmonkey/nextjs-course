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

export async function findUser(userEmail) {
  const exitingUser = await User.findOne({ email: userEmail });

  return exitingUser;
}

export async function updatePassword(userEmail, newPassword) {
  await User.updateOne(
    { email: userEmail },
    { password: newPassword },
    (err) => {
      if (err) {
        return err;
      }
    }
  );
}
