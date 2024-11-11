import express from "express";

import {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCardItems,
} from "../../controllers/shop/cart-controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCardItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

export default router;
