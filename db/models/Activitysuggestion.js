import mongoose from "mongoose";

const { Schema } = mongoose;

const activitySuggestionSchema = new Schema({
  name: { type: String, required: true },
  likedByUser: { type: [String], required: false },
});

const ActivitySuggestion =
  mongoose.models.ActivitySuggestion ||
  mongoose.model("ActivitySuggestion", activitySuggestionSchema);

export default ActivitySuggestion;
