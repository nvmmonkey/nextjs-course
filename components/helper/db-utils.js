import mongoose from "mongoose";
import User from "../../models/UserModel";
import Comment from "../../models/CommentModel";

export async function connectMongoDB() {
  const url = `mongodb+srv://kit1:${process.env.mongoAPI}@cluster0.dc50xli.mongodb.net/events`;

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  return await mongoose.connect(url, { useNewUrlParser: true });
}

export async function insertUser(email) {
  const newsletter = new User({
    id: new Date().toISOString(),
    email: email,
  });

  newsletter.save();
}

export async function insertComment(newComment) {
  // const newsletter = new User({
  //   id: new Date().toISOString(),
  //   email: email,
  // });

  // newsletter.save();

  let comment = new Comment({
    eventId: newComment.eventId,
    name: newComment.name,
    email: newComment.email,
    comment: newComment.comment,
  });

  await comment.save();
  console.log("Comment Added!");
}

export async function findDocuments(collectionModel, find, sort) {
  const document = await collectionModel.find(find).sort(sort);
  return document;
}
