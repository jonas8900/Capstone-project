import dbConnect from "@/db/connect";
import FinalEvent from "@/db/models/FinalEvent";

export default async function getPartyPlanner(request, response) {
  const partyPlanner = request.query.partyPlanner;
  console.log("API Path:", `/api/planner/${partyPlanner}`);
  await dbConnect();

  if (request.method === "GET") {
    try {
      const finalEvent = await FinalEvent.findById(partyPlanner);
      console.log(finalEvent);
      return response.status(200).json(finalEvent);
    } catch (error) {
      console.error("Fehler beim Abrufen der Events:", error);
      response.status(405).json({ error: error.message });
    }
  }

  if (request.method === "PUT") {
    try {
      const typedProductsUserID = request.body.typedProducts.userID;
      const typedProduct = request.body.typedProducts.product;
      const updatedEvent = await FinalEvent.findByIdAndUpdate(
        partyPlanner,
        {
          $push: {
            products: { userID: typedProductsUserID, product: typedProduct },
          },
        },
        { new: true }
      );
      console.log(updatedEvent);
      console.log(typedProduct);
      response.status(200).json({ status: `Event ${partyPlanner} updated!` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
