import dbConnect from "@/db/connect";
import UserDetails from "@/db/models/UserDetails";

export default async function getSingleUserByMail(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const respondedUserData = await UserDetails.findOne({
        email: request.body.email,
      });
      return response.status(200).json(respondedUserData);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "PUT") {
    const id = request.body.userData._id;

 
    try {
      const updatedUser = await UserDetails.findByIdAndUpdate(id, {
        $set: {
          activeGroupId: request.body.fetchedGroup._id,
        },
        $push: {
          joinedGroupList: request.body.fetchedGroup._id,
        },
      });
      response.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
