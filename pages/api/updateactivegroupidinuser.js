import dbConnect from "@/db/connect";
import UserDetails from "@/db/models/UserDetails";

export default async function updateActiveGroupIdInUser(request, response) {
  await dbConnect();

  if (request.method === "PUT") {
    try {
      const filter = { email: request.body.userSessionData.email };
      const refreshObjectOptions = { new: true };
      const update = {
        $set: {
          activeGroupId: request.body.activeGroupId.selectGroup,
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
