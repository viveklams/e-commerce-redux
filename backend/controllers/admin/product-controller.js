import { imageUploadUtil } from "../../helpers/cloudinary.js";

export const handleImageUpload = async (req, res) => {
  try {
    // Check if the file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    // Convert the file buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`; // Fixed `mimtype` to `mimetype`

    // Upload the image to Cloudinary
    const result = await imageUploadUtil(url);

    // Check the result from Cloudinary
    if (!result || !result.secure_url) {
      throw new Error("Image upload failed.");
    }

    // Respond with success
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Image upload error:", error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Image upload failed. Please try again later.",
      error: error.message || "Image upload failed.",
    });
  }
};
