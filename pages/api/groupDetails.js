import dbConnect from "@/db/connect";
import GroupDetails from "@/db/models/GroupDetails";

export default async function getGroupDetails(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const allGroups = await GroupDetails.find();
      return response.status(200).json(allGroups);
    } catch (error) {
      console.error("Fehler beim Abrufen der Events:", error);
      response.status(405).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const newGroup = request.body;
      await GroupDetails.create(newGroup);

      response.status(201).json({ status: "final event created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
