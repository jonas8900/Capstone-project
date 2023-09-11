import dbConnect from "@/db/connect";
import VoteForActivityDate from "@/db/models/VoteForActivityDate";

export default async function voteForActivityDate(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    const requestData = request.body;

    const currentId = requestData.currentId;

    try {
      const currentActivity = await VoteForActivityDate.findOne({
        activitySuggestionId: currentId,
      });

      response.status(201).json(currentActivity);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
