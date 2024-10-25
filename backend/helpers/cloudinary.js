import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dcfdevaey",
  api_key: "347655613639249",
  api_secret: "jbfbW0q-bxHQAP32ZBv0Fcgs2s4",
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
