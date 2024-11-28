import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"; // Your auth reducer
import adminProductsSlice from "./admin/products-slice/index"; // Your admin products reducer
import adminOrderSlice from "./admin/order-slice/index";
import shopProductsSlice from "./shop/products-slice/index"; // Your  products reducer
import shopCartSlice from "./shop/cart-slice/index";
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Manages authentication state
    adminProducts: adminProductsSlice, // Manages admin products state
    adminOrder: adminOrderSlice,
    shoppingProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
  },
});

export default store;
