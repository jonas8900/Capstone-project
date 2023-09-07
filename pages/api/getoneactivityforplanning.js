import dbConnect from "@/db/connect";
import ActivitySuggestion from "@/db/models/Activitysuggestion";
import UserDetails from "@/db/models/UserDetails";

export default async function getoneactivityforplanning(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const requestData = request.body;

      const currentId = requestData.currentId;
      const sessionData = requestData.sessionData;

      const userData = await UserDetails.findOne({
        email: sessionData.email,
      });

      const activityData = await ActivitySuggestion.find({
        groupId: userData.activeGroupId,
      });

      const currentActivity = await ActivitySuggestion.findOne({
        _id: currentId,
      });
      response.status(200).json(currentActivity);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
