import dbConnect from "@/db/connect";
import FinalEvent from "@/db/models/FinalEvent";
import UserDetails from "@/db/models/UserDetails";
import VoteForActivityDate from "@/db/models/VoteForActivityDate";

export default async function createFinaleEventAndDeleteVoting(
  request,
  response
) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const finalEvent = request.body;
      const userData = await UserDetails.findOne({
        email: finalEvent.userSessionData.email,
      });

      // await VoteForActivityDate.create(voteForActivityDate);
      const createFinalEvent = await FinalEvent.create({
        groupId: userData.activeGroupId,
        finalDate: finalEvent.finalDate,
        name: finalEvent.name,
        ort: finalEvent.ort,
        isInVotingProcess: false,
        activitySuggestionId: finalEvent.activitySuggestionId,
      });

      response.status(201).json(createFinalEvent);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    const id = request.body._id;
    console.log("FINALIDTODELETE:", id);
    try {
      const deletedVoting = await VoteForActivityDate.findByIdAndDelete(id);
      response.status(200).json(deletedVoting);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "PUT") {
    const id = request.body.addEventObject;
    try {
      const fetchById = await FinalEvent.findByIdAndUpdate(id, {
        $set: {
          finalDate: request.body.addEventObject.finalDate,
          ort: request.body.addEventObject.ort,
          veranstaltung: request.body.addEventObject.veranstaltung,
        },
      });

      response.status(200).json({ status: `voting ${id} send!` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message`${id}` });
    }
  }
}
