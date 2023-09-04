import dbConnect from "@/db/connect";
import ActivitySuggestion from "@/db/models/Activitysuggestion";

export default async function getActivitySuggestions(request, response) {
  await dbConnect();
  const { id } = request.body;

  if (request.method === "GET") {
    try {
      const activitySuggestions = await ActivitySuggestion.find();
      return response.status(200).json(activitySuggestions);
    } catch (error) {
      console.error("Fehler beim Abrufen der Activity Suggestions:", error);
      response.status(405).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const activitySuggestion = request.body;
      await ActivitySuggestion.create(activitySuggestion);

      response.status(201).json({ status: "activity suggestion created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      await ActivitySuggestion.findByIdAndDelete(id);
      response
        .status(200)
        .json({ status: `activity with id: ${id} successfully deleted.` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PUT") {
    try {
      await ActivitySuggestion.findByIdAndUpdate(id, {
        $set: {
          likedByUser: request.body.updatedFavoriteActivity[0].likedByUser,
        },
      });


      response.status(200).json({ status: `activity ${id} updated!` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
