import mongoose from "mongoose";

const { Schema } = mongoose;

const finalEventSchema = new Schema({
  veranstaltung: { type: String, required: true },
  isInVotingProcess: { type: Boolean, required: true },
  ort: { type: String, required: true },
  finalDate: { type: Date, required: true },
  parentId: { type: String, required: true },
  products: {
    type: [{ userID: String, product: String, productId: String }],
    required: false,
  },
});

const FinalEvent =
  mongoose.models.FinalEvent || mongoose.model("FinalEvent", finalEventSchema);

export default FinalEvent;
