import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  myEvents: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = model("User", userSchema, "users");

export default User;
