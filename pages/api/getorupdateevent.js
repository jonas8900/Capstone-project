import dbConnect from "@/db/connect";
import FinalEvent from "@/db/models/FinalEvent";
import UserDetails from "@/db/models/UserDetails";

export default async function createFinaleEventAndDeleteVoting(
  request,
  response
) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const requestData = request.body;

      const currentEventId = requestData.currentEventId;
      const sessionData = requestData.sessionData;

      const userData = await UserDetails.findOne({
        email: sessionData.email,
      });

      const finalEventData = await FinalEvent.find({
        groupId: userData.activeGroupId,
      });

      const currentActivity = await FinalEvent.findOne({
        _id: currentEventId,
      });
      response.status(200).json(currentActivity);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PUT") {
    const updateDateData = request.body._id;
    console.log(updateDateData);
    try {
      await FinalEvent.findByIdAndUpdate(updateDateData, {
        $set: {
          finalDate: request.body.finalDate,
          ort: request.body.ort,
          name: request.body.name,
        },
      });

      response.status(200).json({ status: `voting ${updateDateData} send!` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message`${updateDateData}` });
    }
  }

  


}

