import dbConnect from "@/db/connect";
import UserDetails from "@/db/models/UserDetails";

export default async function createNewUser(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const userData = request.body;
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
}
