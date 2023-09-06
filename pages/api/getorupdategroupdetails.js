import dbConnect from "@/db/connect";
import GroupDetails from "@/db/models/GroupDetails";

export default async function getGroupDetails(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    const activeGroupId = request.body.activeGroupId;
    try {
      const createdGroup = await GroupDetails.findOne({ _id: activeGroupId });
      response.status(201).json(createdGroup);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PUT") {
    const id = request.body.groupIdFromLink;
    try {
      await GroupDetails.findByIdAndUpdate(id, {
        $set: {
          inviteLink: request.body.generatedLink,
        },
      });
      response.status(200).json({ message: `Link in Group for 1 hour` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
