import dbConnect from "@/db/connect";
import FinalEvent from "@/db/models/FinalEvent";

export default async function getFinalEvent(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const finalEvent = await FinalEvent.find();
      return response.status(200).json(finalEvent);
    } catch (error) {
      console.error("Fehler beim Abrufen der Events:", error);
      response.status(405).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const finalEvent = request.body;
      await FinalEvent.create(finalEvent);

      response.status(201).json({ status: "final event created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    const { id } = request.body;
    try {
      await FinalEvent.findByIdAndDelete(id);
      response
        .status(200)
        .json({ status: `Event with id: ${id} successfully deleted.` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "PUT") {
    const id = request.body.addEventObject;
    try {
      const fetchById = await FinalEvent.findByIdAndUpdate(id, {
        $set: {
          finalDate: request.body.addEventObject.finalDate,
          ort: request.body.addEventObject.ort,
          veranstaltung: request.body.addEventObject.veranstaltung,
        },
      });
      console.log(id);
      response.status(200).json({ status: `voting ${id} send!` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message`${id}` });
    }
  }
}
