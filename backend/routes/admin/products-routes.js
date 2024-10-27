import express from "express";
import {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} from "../../controllers/admin/product-controller.js";
import { upload } from "../../helpers/cloudinary.js";

const router = express.Router();

// Route to handle image uploads
router.post(
  "/upload-image",
  upload.single("my_file"),
  async (req, res, next) => {
    try {
      // If there's no file, respond with an error
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded.",
        });
      }

      // Call the handler function
      await handleImageUpload(req, res);
    } catch (error) {
      console.error("Upload error:", error); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: "An error occurred during the upload process.",
        error: error.message,
      });
    }
  }
);

router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete(
  "/delete/:id",
  (req, res, next) => {
    console.log("Delete request received for ID:", req.params.id);
    next();
  },
  deleteProduct
);
router.get("/get", fetchAllProducts);

export default router;
