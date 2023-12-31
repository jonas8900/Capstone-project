import mongoose from "mongoose";

const { Schema } = mongoose;

const activitySuggestionSchema = new Schema({
  name: { type: String, required: true },
  groupId: { type: String, reuquired: true },
  likedByUser: { type: [{ userID: String }] },
});

const ActivitySuggestion =
  mongoose.models.ActivitySuggestion ||
  mongoose.model("ActivitySuggestion", activitySuggestionSchema);

export default ActivitySuggestion;
