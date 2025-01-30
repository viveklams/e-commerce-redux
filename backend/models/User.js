import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
