
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handleUploadPicture(request, response) {
  if (request.method === "POST") {

    const form = formidable({});
    const [, files] = await form.parse(request);

    const image = files.file[0];

    const cloudinaryResponse = await cloudinary.uploader.upload(
      image.filepath,
      {
        public_id: image.newFilename,
      }
    );

    response.status(200).json(cloudinaryResponse);
    return;
  }

  response.status(405).json({ message: "Method not allowed." });




}
