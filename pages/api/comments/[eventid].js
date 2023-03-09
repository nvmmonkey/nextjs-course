import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

async function handler(req, res) {
  const eventId = req.query.eventid;

  if (req.method === "POST") {
    const { name, email, comment } = req.body;

    if (
      !name ||
      name.trim() === "" ||
      !name ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid inputs!" });
      return;
    }

    const url = `mongodb+srv://kit1:${process.env.mongoAPI}@cluster0.dc50xli.mongodb.net/events`;
    mongoose.connect(url, { useNewUrlParser: true });
    console.log("Connected DB!");

    const commentsSchema = {
      eventId: String,
      name: String,
      email: String,
      comment: String,
    };

    const Comment = models.Comment || mongoose.model("Comment", commentsSchema); //NextJS required to check if duplicated models

    const newComment = new Comment({
      eventId: eventId,
      name: name,
      email: email,
      comment: comment,
    });

    newComment.save();
    console.log("Comment Added!");

    return res
      .status(201)
      .json({ message: "Successfully Comment!", newComment: newComment });
  }

  if (req.method === "GET") {
    const url = `mongodb+srv://kit1:${process.env.mongoAPI}@cluster0.dc50xli.mongodb.net/events`;
    mongoose.connect(url, { useNewUrlParser: true });
    console.log("Connected DB!");

    const document = await models.Comment.find({ eventId: eventId }).sort({
      _id: -1,
    });

    return res.status(200).json({ comments: document });
  }
}

export default handler;
