import Comment from "../../../models/CommentModel";
import {
  connectMongoDB,
  insertComment,
  findDocuments,
} from "../../../components/helper/db-utils";

async function handler(req, res) {
  const eventId = req.query.eventid;

  try {
    connectMongoDB();
    console.log("Connected DB!");
  } catch (err) {
    res.status(500).json("Fail connecting DB!");
    return;
  }

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

    const newComment = new Comment({
      eventId: eventId,
      name: name,
      email: email,
      comment: comment,
    });

    try {
      insertComment(newComment);
      return res
        .status(201)
        .json({ message: "Added Comment!", newComment: newComment });
    } catch (err) {
      console.log(err.message);
      res
        .status(500)
        .json({ message: "Inserting Comment Failed!", error: err.message });
      return;
    }
  }

  if (req.method === "GET") {
    try {
      connectMongoDB();
      const document = await findDocuments(
        Comment,
        { eventId: eventId },
        { _id: -1 }
      );
      res.status(200).json({ comments: document });
    } catch (err) {
      res.status(500).json({ message: "Failed fetching comments!" });
      return;
    }
  }
}

export default handler;
