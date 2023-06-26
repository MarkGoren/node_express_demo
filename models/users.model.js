import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  displayedProducts: {
    type: [Object],
    required: false,
  },
  cart: {
    type: [Object],
    required: false,
  },
  purchasedProducts: {
    type: [Object],
    required: false,
  },
  balance: {
    type: Number,
    default: 0,
  },
  resetToken: {
    type: String,
    required: false,
  },
  tokenExpiration: {
    type: Date,
    required: false,
  },
});

const Users = mongoose.model("Users", userSchema);
export default Users;
