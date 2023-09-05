import mongoose from "mongoose";

const { Schema } = mongoose;

const groupDetailsSchema = new Schema({
  groupname: { type: String, required: true },
  members: { type: [{ userID: String, userName: String }] },
  ownerID: { type: String, required: true },
  iviteLink: { type: String },
});

const GroupDetails =
  mongoose.models.GroupDetails ||
  mongoose.model("GroupDetails", groupDetailsSchema);

export default GroupDetails;
