import dbConnect from "@/db/connect";
import GroupDetails from "@/db/models/GroupDetails";
import UserDetails from "@/db/models/UserDetails";

export default async function getOrUpdateGroupsWithPictures(request, response) {
  await dbConnect();

  if (request.method === "PUT") {
    const userDataFromBody = request.body.user;
    try {
      const userData = await UserDetails.findOne({
        email: userDataFromBody.email,
      });

      if (userData) {
        const { activeGroupId } = userData;

        const findGroupWithGroupId = await GroupDetails.findOne({
          _id: activeGroupId,
        });

        const updateTheGroup = await GroupDetails.findOneAndUpdate(
          findGroupWithGroupId._id,
          {
            $push: {
              groupPictures: {
                url: request.body.cloudyImage.url,
                width: request.body.cloudyImage.width,
                height: request.body.cloudyImage.height,
                public_id: request.body.cloudyImage.public_id,
              },
            },
          }
        );

        response.status(200).json(updateTheGroup);
      }
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    const userDataFromBody = request.body.user;
    try {
      const userData = await UserDetails.findOne({
        email: userDataFromBody.email,
      });

      if (userData) {
        const { activeGroupId } = userData;

        const findGroupWithGroupId = await GroupDetails.findOne({
          _id: activeGroupId,
        });
        response.status(200).json(findGroupWithGroupId);
      }
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
