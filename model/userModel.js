import mongoose from "mongoose";

const userSchema = {
  email: String,
  password: String,
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;