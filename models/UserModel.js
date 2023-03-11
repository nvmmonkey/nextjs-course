import mongoose from "mongoose";

const usersSchema = {
  id: String,
  email: String,
};

const User = mongoose.models.User || mongoose.model("User", usersSchema); //NextJS required to check if duplicated models

export default User;
