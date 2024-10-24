import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "vlams",
  api_key: "225144714623768",
  api_secret: "XKt6vo5J9S2g9IM4QJuES1HpprQ",
});

const storage = new multer.memoryStorage();

async function handleImageUpload(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

export default { upload, handleImageUpload };
