import dbConnect from "@/db/connect";
import GroupDetails from "@/db/models/GroupDetails";

export default async function updateGroupAfterJoin(request, response) {
  await dbConnect();

  if (request.method === "PUT") {
    try {
      const filter = { _id: request.body.fetchedGroupData._id };
      const refreshObjectOptions = { new: true };
      const updatedGroup = {
        $push: {
          members: {
            userID: request.body.userData.email,
            userName: request.body.userData.name,
          },
        },
      };
      const updateAfterJoinGroup = await GroupDetails.findOneAndUpdate(
        filter,
        updatedGroup,
        refreshObjectOptions
      );

      response.status(201).json(updateAfterJoinGroup);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
