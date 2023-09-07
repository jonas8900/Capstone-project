import dbConnect from "@/db/connect";
import UserDetails from "@/db/models/UserDetails";
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
      const startVotingProcess = request.body;
      const userData = await UserDetails.findOne({
        email: startVotingProcess.userSessionData.email,
      });

      const createNewVoting = await VoteForActivityDate.create({
        groupId: userData.activeGroupId,
        activitySuggestionId: startVotingProcess.activitySuggestionId,
        name: startVotingProcess.name,
        isInVotingProcess: startVotingProcess.isInVotingProcess,
        ort: startVotingProcess.ort,
        date1: startVotingProcess.date1,
        date2: startVotingProcess.date2,
        date3: startVotingProcess.date3,
        date4: startVotingProcess.date4,
      });

      response.status(201).json(createNewVoting);
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
