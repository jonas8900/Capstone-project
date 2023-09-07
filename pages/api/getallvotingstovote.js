import dbConnect from "@/db/connect";
import UserDetails from "@/db/models/UserDetails";
import VoteForActivityDate from "@/db/models/VoteForActivityDate";

export default async function getOrUpdateActivitySuggestion(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const sessionData = request.body;

      const userData = await UserDetails.findOne({
        email: sessionData.email,
      });
      const votingForActivity = await VoteForActivityDate.find({
        groupId: userData.activeGroupId,
      });
      
      response.status(200).json(votingForActivity);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
