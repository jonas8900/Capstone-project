import dbConnect from "@/db/connect";
import UserDetails from "@/db/models/UserDetails";
import { useSession } from "next-auth/react";

export default async function getSingleUserByMail(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const respondedUserData = await UserDetails.findOne({
        email: request.body.email,
      }).exec();
      return response.status(200).json(respondedUserData);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "GET") {
    try {
      const respondedUserData = await UserDetails.find();
      return response.status(200).json(respondedUserData);
    } catch (error) {
      console.error("Fehler beim Abrufen der Activity Suggestions:", error);
      response.status(405).json({ error: error.message });
    }
  }
}
