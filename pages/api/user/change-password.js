import mongoose from "mongoose";
import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../helper/auth-utils";
import {
  ConnectMongoDB,
  findUser,
  updatePassword,
} from "../../../helper/db-utils";

async function handler(req, res) {
  //extract old/new pwd user entered
  if (req.method !== "PATCH") {
    return;
  }

  //***** verfiy request coming from authenticated user ***
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return; //deny reaction if not auth
  }

  const userEmail = session.user.email; //get email from auth-user

  //password changing logic
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  //look into DB findUser + old pwd match current pwd in DB
  try {
    await ConnectMongoDB();
  } catch (error) {
    res.status(500).json({ message: "Failing connecting to DB!" });
    return;
  }

  const exitingUser = await findUser(userEmail);

  if (!exitingUser) {
    res.status(404).json({ message: "User not found!" });
    mongoose.connection.close();
    return;
  }

  const currentPassword = exitingUser.password;
  const isPasswordEqual = await verifyPassword(oldPassword, currentPassword);

  if (!isPasswordEqual) {
    res.status(403).json({ message: "Invalid Password!" });
    mongoose.connection.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  try {
    const result = await updatePassword(exitingUser.email, hashedPassword);
    res.status(200).json({ message: "Password updated!" });
    mongoose.connection.close();
    return
  } catch (error) {
    res.status(403).json({ message: "Cannot update Password!" });
    mongoose.connection.close();
    return;
  }

  //only replace the old pwd with new if so
}

export default handler;
