import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";
import User from "../../../models/UserModel";
import { connectMongoDB } from "../../../components/helper/MongoConnect";

async function insertUser(email) {
  // const usersSchema = {
  //   id: String,
  //   email: String,
  // };

  // const User = mongoose.models.User || mongoose.model("User", usersSchema); //NextJS required to check if duplicated models
  const newsletter = new User({
    id: new Date().toISOString(),
    email: email,
  });

  newsletter.save();
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid emaill address!" });
      return;
    }

    try {
      connectMongoDB();
    } catch (err) {
      res.status(500).json({ message: "fail connect!" });
    }

    try {
      insertUser(email);
    } catch (err) {
      res.status(500).json({ message: "Fail inserting data to DB!" });
      return;
    }

    return res.status(201).json({ message: "Successfully Signup!" });
  }
}

export default handler;
