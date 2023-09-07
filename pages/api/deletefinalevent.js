import dbConnect from "@/db/connect";
import FinalEvent from "@/db/models/FinalEvent";
import UserDetails from "@/db/models/UserDetails";

export default async function deleteFinalEvent(request, response) {
  dbConnect();

  if (request.method === "DELETE") {
    const id = request.body.id;
    try {
      await FinalEvent.findByIdAndDelete(id);
      response
        .status(200)
        .json({ status: `activity with id: ${id} successfully deleted.` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
