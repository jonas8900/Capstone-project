import dbConnect from "@/db/connect";
import GroupDetails from "@/db/models/GroupDetails";

export default async function getGroupDetails(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    const joinedGroupList = request.body.joinedGroupList;

    try {
      const createdGroup = await GroupDetails.find({
        _id: { $in: joinedGroupList },
      });
      console.log(createdGroup);
      response.status(201).json(createdGroup);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
