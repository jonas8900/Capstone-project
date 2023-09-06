import dbConnect from "@/db/connect";
import ActivitySuggestion from "@/db/models/Activitysuggestion";
import UserDetails from "@/db/models/UserDetails";

export default async function getOrUpdateActivitySuggestion(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const sessionData = request.body;

      const userData = await UserDetails.findOne({
        email: sessionData.email,
      });
      const activityData = await ActivitySuggestion.find({
        groupId: userData.activeGroupId,
      });
      response.status(200).json(activityData);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PUT") {
    const { id } = request.body;
    try {
      await ActivitySuggestion.findByIdAndUpdate(id, {
        $set: {
          likedByUser: request.body.updatedFavoriteActivity[0].likedByUser,
        },
      });
      response.status(200).json({ message: `successfully updated ${id}` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
