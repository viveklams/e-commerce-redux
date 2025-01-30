import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer memory storage for image uploads
const storage = multer.memoryStorage();

// Utility function to upload image to Cloudinary
async function imageUploadUtil(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto", // Automatically determines the resource type
    });
    return result;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Image upload failed.");
  }
}

// Middleware to handle image uploads
const upload = multer({ storage });

// Export the upload middleware and image upload utility function
export { upload, imageUploadUtil };
