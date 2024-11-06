import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for the shopping products slice
const initialState = {
  isLoading: false,
  productList: [],
  error: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );

    console.log(result);

    return result?.data;
  }
);

// Create the slice for shopping products
const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    resetProducts: (state) => {
      // Action to reset the product list and loading state
      state.productList = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true; // Set loading state
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.productList = action.payload.data; // Set product list to fetched data
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.error = action.payload; // Set error message
      });
  },
});

// Export the reset action
export const { resetProducts } = shoppingProductSlice.actions;

// Export the reducer
export default shoppingProductSlice.reducer;
