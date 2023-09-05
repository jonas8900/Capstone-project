import dbConnect from "@/db/connect";
import ActivitySuggestion from "@/db/models/Activitysuggestion";
import UserDetails from "@/db/models/UserDetails";

export default async function createOrDeleteActivitySuggestion(
  request,
  response
) {
  await dbConnect();
  const { id } = request.body;

  if (request.method === "POST") {
    try {
      const activityAndUserSessionData = request.body;
      const userData = await UserDetails.findOne({
        email: activityAndUserSessionData.userSessionData.email,
      });
      const activityData = await ActivitySuggestion.create({
        name: activityAndUserSessionData.newActivityName,
        groupId: userData.activeGroupId,
        likedByUser: [],
      });
      response.status(200).json(activityData);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    console.log(id);
    try {
      await ActivitySuggestion.findByIdAndDelete(id);
      response
        .status(200)
        .json({ status: `activity with id: ${id} successfully deleted.` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
