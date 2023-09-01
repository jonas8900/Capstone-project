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

  if (request.method === "PUT") {
    const id = request.body.updateSingleDate._id;
    try {
      await VoteForActivityDate.findByIdAndUpdate(id, {
        $set: {
          isInVotingProcess: request.body.updateSingleDate.isInVotingProcess,
          date1IsTrue: request.body.updateSingleDate.date1IsTrue,
          date2IsTrue: request.body.updateSingleDate.date2IsTrue,
          date3IsTrue: request.body.updateSingleDate.date3IsTrue,
          date4IsTrue: request.body.updateSingleDate.date4IsTrue,
          noDateMatches: request.body.updateSingleDate.noDateMatches,
          votedUser: request.body.updateSingleDate.votedUser,
        },
      });
      response.status(200).json({ status: `voting ${id} send!` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message`${id}` });
    }
  }

  if (request.method === "DELETE") {
    const id = request.body.objectWithTheSameID._id;
    try {
      await VoteForActivityDate.findByIdAndDelete(id);
      response
        .status(200)
        .json({ status: `Voting with id: ${id} successfully deleted.` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
