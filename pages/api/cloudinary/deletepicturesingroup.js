import dbConnect from "@/db/connect";
import GroupDetails from "@/db/models/GroupDetails";

export default async function deleteGroupsWithPictures(request, response) {
  await dbConnect();

  const { public_id } = request.body;

  try {
    //need to figure out how the filter function gets into an array, answers from chatGPT and Stackoverflow
    const filter = { "groupPictures.public_id": public_id };

    const update = {
      $pull: { groupPictures: { public_id: public_id } },
    };

    const options = { new: true };

    const findGroupWithGroupId = await GroupDetails.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (findGroupWithGroupId) {
      response.status(200).json(findGroupWithGroupId);
    } else {
      response.status(404).json({ message: "Gruppe nicht gefunden" });
    }
  } catch (error) {
    console.error(error);
    response.status(400).json({ error: error.message });
  }
}
