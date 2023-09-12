import dbConnect from "@/db/connect";
import { v2 as cloudinary } from "cloudinary";

export default async function deleteGroupsWithPictures(request, response) {
  await dbConnect();

  if (request.method === "DELETE") {
    const { public_id } = request.body;

    try {
      await cloudinary.api.delete_resources(public_id);
      response.status(200).json(public_id);
    } catch (error) {
      console.error("Error deleting image:", error);
      response
        .status(500)
        .json({ message: "An error occurred while deleting the image." });
    }
  }
}
