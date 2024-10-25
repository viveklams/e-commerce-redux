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

//add a product
export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

//fetch all products
export const fetchAllProduct = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        succcess: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};
