import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "vlams",
  api_key: "225144714623768",
  api_secret: "XKt6vo5J9S2g9IM4QJuES1HpprQ",
});

const storage = new multer.memoryStorage();

export async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

export const upload = multer({ storage });
