import mongoose from "mongoose";

const { Schema } = mongoose;

const userDetailsSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  activeGroupId: { type: String },
  joinedGroupList: { type: [String] },
});

const UserDetails =
  mongoose.models.UserDetails ||
  mongoose.model("UserDetails", userDetailsSchema);

export default UserDetails;
