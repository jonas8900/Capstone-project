// import dbConnect from "@/db/connect";
// import UserDetails from "@/db/models/UserDetails";

// export default async function getSingleUserByMail(request, response) {
//   await dbConnect();

//   if (request.method === "POST") {
//     try {
//       const respondedUserData = await UserDetails.findOne({
//         email: request.body.email,
//       });
//       console.log(request.body);
//       return response.status(200).json(respondedUserData);
//     } catch (error) {
//       console.log(error);
//       response.status(400).json({ error: error.message });
//     }
//   }
// }
