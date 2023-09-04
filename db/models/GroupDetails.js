import mongoose from "mongoose";

const { Schema } = mongoose;

const groupDetailsSchema = new Schema({
  groupname: { type: String, required: true },
  members: { type: [String] },
  ownerID: { type: String, required: true },
});

const GroupDetails =
  mongoose.models.GroupDetails ||
  mongoose.model("GroupDetails", groupDetailsSchema);

export default GroupDetails;
