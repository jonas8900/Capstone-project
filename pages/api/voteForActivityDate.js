import dbConnect from "@/db/connect";
import VoteForActivityDate from "@/db/models/VoteForActivityDate";

export default async function voteForActivityDate(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const voteForActivityDate = await VoteForActivityDate.find();
      return response.status(200).json(voteForActivityDate);
    } catch (error) {
      console.error("Fehler beim Abrufen der Abstimmung:", error);
      response.status(405).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const voteForActivityDate = request.body;
      await VoteForActivityDate.create(voteForActivityDate);

      response.status(201).json({ status: "voting created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
