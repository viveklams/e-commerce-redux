import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"; // Your auth reducer
import adminProductsSlice from "./admin/products-slice/index"; // Your admin products reducer

import shopProductsSlice from "./shop/products-slice/index"; // Your  products reducer
import shopCartSlice from "./shop/cart-slice/index";
import shopAddressSlice from "./shop/address-slice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Manages authentication state
    adminProducts: adminProductsSlice, // Manages admin products state
    shoppingProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
  },
});

export default store;
