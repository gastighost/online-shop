import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
