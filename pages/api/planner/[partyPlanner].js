import dbConnect from "@/db/connect";
import FinalEvent from "@/db/models/FinalEvent";

export default async function getPartyPlanner(request, response) {
  const partyPlanner = request.query.partyPlanner;
  await dbConnect();
  const { id } = request.body;

  if (request.method === "GET") {
    try {
      const finalEvent = await FinalEvent.findById(partyPlanner);

      return response.status(200).json(finalEvent);
    } catch (error) {
      console.error("Fehler beim Abrufen der Events:", error);
      response.status(405).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      await FinalEvent.findByIdAndUpdate(partyPlanner, {
        $pull: {
          products: { productId: id },
        },
      });
      response
        .status(200)
        .json({ status: `activity with id: ${id} successfully deleted.` });
      console.log(id);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PUT") {
    try {
      const typedProductsUserID = request.body.typedProducts.userID;
      const typedProduct = request.body.typedProducts.product;
      const typedProductId = request.body.typedProducts.productId;
      const updatedEvent = await FinalEvent.findByIdAndUpdate(
        partyPlanner,
        {
          $push: {
            products: {
              userID: typedProductsUserID,
              product: typedProduct,
              productId: typedProductId,
            },
          },
        },
        { new: true }
      );
      response.status(200).json({ status: `Event ${partyPlanner} updated!` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
