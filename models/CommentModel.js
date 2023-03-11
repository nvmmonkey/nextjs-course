import mongoose from "mongoose";

const commentsSchema = {
  eventId: String,
  name: String,
  email: String,
  comment: String,
};

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentsSchema);

export default Comment;
