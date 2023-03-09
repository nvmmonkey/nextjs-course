import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid emaill address!" });
      return;
    }

    const url = `mongodb+srv://kit1:${process.env.mongoAPI}@cluster0.dc50xli.mongodb.net/newslettersDB`;

    mongoose.connect(url, { useNewUrlParser: true });
    console.log("Connected DB!");

    const usersSchema = {
      id: String,
      email: String,
    };

    const User = models.User || mongoose.model("User", usersSchema); //NextJS required to check if duplicated models
    const newsletter = new User({
      id: new Date().toISOString(),
      email: email,
    });

    newsletter.save() && console.log("Item Added at " + newsletter.id);

    return res
      .status(201)
      .json({ message: "Successfully Signup!", newsletter: newsletter });
  }
}

export default handler;
