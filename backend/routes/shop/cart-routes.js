import express from "express";

import {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
} from "../../controllers/shop/cart-controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

export default router;
