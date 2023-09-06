import dbConnect from "@/db/connect";
import GroupDetails from "@/db/models/GroupDetails";

export default async function getGroupWithInviteLink(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    const inviteLink = request.body.groupname;
    const activeGroupId = request.body.activeGroupId;
    try {
      const groupWithInviteLink = await GroupDetails.findOne({
        inviteLink: inviteLink,
      });
      response.status(201).json(groupWithInviteLink);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
