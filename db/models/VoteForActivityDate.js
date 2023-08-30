import mongoose from "mongoose";

const { Schema } = mongoose;

const voteForActivityDateSchema = new Schema({
  parentId: { type: String },
  veranstaltung: { type: String, required: true },
  isInVotingProcess: { type: Boolean, required: true },
  ort: { type: String, required: true },
  date1: { type: Date },
  date2: { type: Date },
  date3: { type: Date },
  date4: { type: Date },
  date1IsTrue: { type: [{ userID: String }] },
  date2IsTrue: { type: [{ userID: String }] },
  date3IsTrue: { type: [{ userID: String }] },
  date4IsTrue: { type: [{ userID: String }] },
  noDateMatches: { type: [{ userID: String }] },
});

const VoteForActivityDate =
  mongoose.models.VoteForActivityDate ||
  mongoose.model("VoteForActivityDate", voteForActivityDateSchema);

export default VoteForActivityDate;
