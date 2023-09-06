import dbConnect from "@/db/connect";
import UserDetails from "@/db/models/UserDetails";

export default async function createOrUpdateUser(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const userData = request.body;
      console.log(userData);
      await UserDetails.create({
        email: request.body.email,
        name: request.body.name,
        activeGroupId: undefined,
        joinedGroupList: [],
      });
      return response.status(200).json(userData);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PUT") {
    try {
      const filter = { email: request.body.ownerID };
      const refreshObjectOptions = { new: true };
      const update = {
        $push: {
          joinedGroupList: request.body._id,
        },
        $set: {
          activeGroupId: request.body._id,
        },
      };

      const updatedUserDetails = await UserDetails.findOneAndUpdate(
        filter,
        update,
        refreshObjectOptions
      );

      response.status(200).json(updatedUserDetails);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
