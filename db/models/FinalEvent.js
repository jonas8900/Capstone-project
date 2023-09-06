import mongoose from "mongoose";

const { Schema } = mongoose;

const finalEventSchema = new Schema({
  name: { type: String, required: true },
  groupId: { type: String, reuquired: true },
  isInVotingProcess: { type: Boolean, required: true },
  ort: { type: String, required: true },
  finalDate: { type: Date, required: true },
  activitySuggestionId: { type: String, required: true },
  products: {
    type: [{ userID: String, product: String, productId: String }],
    required: false,
  },
});

const FinalEvent =
  mongoose.models.FinalEvent || mongoose.model("FinalEvent", finalEventSchema);

export default FinalEvent;
